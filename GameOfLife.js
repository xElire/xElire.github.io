const rows = 50;
const cols = 50;
let grid = createGrid(rows, cols);
let interval;

function createGrid(rows, cols) {
    const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    return grid;
}

function drawGrid() {
    const game = document.getElementById('game');
    game.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (grid[row][col] ? ' alive' : '');
            cell.addEventListener('click', () => toggleCell(row, col));
            game.appendChild(cell);
        }
    }
}

function toggleCell(row, col) {
    grid[row][col] = !grid[row][col];
    drawGrid();
}

function updateGrid() {
    const newGrid = createGrid(rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const aliveNeighbors = countAliveNeighbors(row, col);
            if (grid[row][col]) {
                newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                newGrid[row][col] = aliveNeighbors === 3;
            }
        }
    }
    grid = newGrid; 
    drawGrid();
}

function countAliveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol]) {
                count++;
            }
        }
    }
    return count;
}

function startGame() {
    if (!interval) {
        interval = setInterval(updateGrid, 100);
    }
}

function stopGame() {
    clearInterval(interval);
    interval = null;
}

function resetGame() {
    grid = createGrid(rows, cols);
    drawGrid();
}

drawGrid();
