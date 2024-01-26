const cells = document.querySelectorAll("#krestiknolik td");
const resetButton = document.getElementById("resetButton");
let i = 0;

function step() {
    this.textContent = i % 2 === 0 ? 'X' : 'O';
    this.classList.add(i % 2 === 0 ? 'x' : 'o');
    this.removeEventListener("click", step);

    if (isVictory(cells)) {
        highlightWinner(cells);
        alert(`${i % 2 === 0 ? 'X' : 'O'} WIN!`);
    } else if (i === 24) {
        alert("DROW!");
    }

    i++;
}

function isVictory(cells) {
    const combs = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];

    for (const comb of combs) {
        const cellValues = comb.map(index => cells[index].textContent);
        if (
            cellValues.every(value => value !== "") &&
            new Set(cellValues).size === 1
        ) {
            return true;
        }
    }
    return false;
}

function highlightWinner(cells) {
    const combs = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];

    for (const comb of combs) {
        const cellValues = comb.map(index => cells[index].textContent);
        if (
            cellValues.every(value => value !== "") &&
            new Set(cellValues).size === 1
        ) {
            for (const index of comb) {
                cells[index].classList.add('winner');
                cells[index].classList.add(`${cellValues[0].toLowerCase()}-winner`);
            }
        }
    }
}

function start() {
    for (const cell of cells) {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'winner', 'x-winner', 'o-winner');
        cell.addEventListener("click", step);
    }
    i = 0;
}

start();

resetButton.addEventListener("click", start);