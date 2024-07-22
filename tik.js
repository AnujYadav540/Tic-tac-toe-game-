const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info"); // Corrected selector
const newGameBtn = document.querySelector(".btn"); // Corrected selector

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Clear the UI: Set text content and enable pointer events for each box
    boxes.forEach((box, index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.className = "box box" + (index + 1);// Corrected string interpolation syntax
        box.classList.remove("win"); // Remove any previous win class
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = "Current player: " + currentPlayer;
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = "Current player: " + currentPlayer;
}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        const [a, b, c] = position;
        if (gameGrid[a] !== "" && gameGrid[a] === gameGrid[b] && gameGrid[a] === gameGrid[c]) {
            winner = gameGrid[a];
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.innerText = "winner" + winner;
        newGameBtn.classList.add("active");
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
    } else if (gameGrid.every((box) => box !== "")) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

initGame(); // Call initGame() to initialize the game when the script loads
