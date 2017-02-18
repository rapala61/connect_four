let play = 0;
let player = play % 2;

function switchPlayer() {
  play++;
  player = play % 2;
}

function createGrid(size, depth) {
  let c = 0;
  let s = size || 1;
  let d = depth || 1;
  let grid = [];

  // rows
  for(let i = 0; i < s; i++) {
    grid[i] = [];

    // columns
    for(let ii = 0; ii < d; ii++) {
      grid[i][ii] = ii;
    }
  }

  return grid;
}

function createEls(arr) {
  let container = document.createElement('div');
  container.classList.add('row');
  arr.forEach((cell, index) => {
    let node = document.createElement('div');
    node.classList.add('cell');
    node.setAttribute('data-index', index);
    container.append(node);
  });
  return container;
}

function createGridEls(grid) {
  let container = document.createElement('div');
  container.classList.add('grid');
  grid.forEach((row) => {
    container.append(createEls(row));
  });
  return container;
}


function checkWin(node, index, player) {
  let cells = [].slice.call(node.children);
  let empty = cells.filter((cell) => { return !cell.classList.contains('player-'+player) });

  if (!!!empty.length) {
    alert('Player ' + player + ' Won!');
  }
}

function walkThrough(node, index, player) {
  console.log(player);
  let cell = node.querySelector(`[data-index='${index}']`);
  let nextRow = cell.parentElement.nextElementSibling;

  if (cell.classList.contains('active')) { return false; };

  cell.classList.add('active');
  cell.classList.add('player-' + player);

  if (nextRow) {
    let nextCell = nextRow.querySelector(`[data-index='${index}']`);
    if (!nextCell.classList.contains('active')) {
      setTimeout(() => {
        walkThrough(nextRow, index, player);
        cell.classList.remove('active');
        cell.classList.remove('player-' + player);
      }, 150) ;
    }else {
      console.log(checkWin(node, index, player));
    }
  }else {
    console.log(checkWin(node, index, player));
  }
}

function playHandler(e) {
  let grid = document.querySelector('.grid');
  let row = e.target.parentElement;
  let index = e.target.getAttribute('data-index');

  walkThrough(row, index, player);
  switchPlayer();
}

$(() => {
  let grid = createGrid(4, 4);
  let gridEls = createGridEls(grid);

  document.body.append(gridEls);

  document.querySelector('.grid').addEventListener('click', _.debounce(playHandler, '400', true));
});
