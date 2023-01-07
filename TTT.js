/*•	Using any of the tools you’ve worked with so far, create a game of Tic-Tac-Toe.
•	Create a Tic-Tac-Toe game grid using your HTML element of choice. 
•	When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
•	A heading should say whether it is X’s or O’s turn and change with each move made.
•	A button should be available to clear the grid and restart the game.
•	When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
*/

//need to determine what winning combinations are//
//figure out how to start game, make it random or declare a player to start?//
//figure out game logic//
//figure out how to clear game board and start a new game with button//

//variables//
const statusDisplay = document.querySelector('.game-status'); //to show player turn//

let gameActive = true; //delcares variable making game play true//
let currentPlayer = "X"; //declares varibale that x is the current player, so if not x it will be o//
let gameBoard = ["", "", "", "", "", "", "", "", ""]; //decalres the gameboard an array of open strings to pass values through during game play//

const winningMessage = () => `${currentPlayer} is the winner!`;//winning message//
const tieGame = () => `Tie Game!`;//tie message//
const currentPlayerTurn = () => `${currentPlayer}'s turn`;//active player turn message//

statusDisplay.innerHTML = currentPlayerTurn();//active player turn//

//array of the various combinations that would win the game//
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//functions//
//function that determines which player is clicking cell//
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
//if current player isn't x, then o is playing//
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
//game logic checks the board against the winnning combinations declared previously based on player turn and determines winner//
function determineWinner() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundTie = !gameBoard.includes("");
    if (roundTie) {
        statusDisplay.innerHTML = tieGame();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    determineWinner();
}
//function clears board with open string array and declares player X as player 1//
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));//on click event runs handle cell click to determine if X or O will appear in cell on console//
document.querySelector('.game-restart').addEventListener('click', restartGame);//on click event runs restart game funtion//
 
 