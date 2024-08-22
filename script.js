// -------------------------- Objects -----------------------
const Gameboard = (function () {

    let board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    let gridContainer = document.querySelector(".grid-container");

    const printBoard = () => {
        console.log("_" + board[0][0] + "_|_" + board[0][1] + "_|_" + board[0][2] + "_");
        console.log("_" + board[1][0] + "_|_" + board[1][1] + "_|_" + board[1][2] + "_");
        console.log(" " + board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
        console.log("\n\n");
    }

    const resetBoard = () => board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    
    const placeToken = (row, col, token) => {
        if (board[row][col] != " "){
            return false;
        }
        else{ 
            board[row][col] = token;
            gridContainer.children[(3 * row) + col].innerHTML = token;
            return true;
        }

    }

    function checkWin(row, col, token) {
        // check row
        if (board[row][0] == token && board[row][1] == token && board[row][2] == token){
            return true;
        }

        // check col
        if (board[0][col] == token && board[1][col] == token && board[2][col] == token){
            return true;
        }

        // check diagonal top-left to bot-right
        if ((row == col) && (board[0][0] == token && board[1][1] == token && board[2][2] == token)) {
            return true;
        }

        // check diagonal top-right to bot-left
        if ((row + col == 2) && (board[0][2] == token && board[1][1] == token && board[0][2] == token)){
            return true
        }
        return false;
    }   

    return {printBoard, resetBoard, placeToken, checkWin};
})();


let GameController = (function () {
    

    function createPlayer(name, value){
        const getName = () => {
            return name;
        }
        const getToken = () => {
            return value;
        }

        return {getName, getToken};
    }

    function switchPlayer(){
        if (activePlayer == player1){
            activePlayer = player2;
        } else{
            activePlayer = player1;
        }
    }

    const player1 = createPlayer("player1", "X");
    const player2 = createPlayer("player2", "O");
    let activePlayer = player1;

    async function playGame(){
        Gameboard.printBoard();
        let gameOver = false;
        while (gameOver == false) {
            const playerMove = prompt("" + activePlayer.getName() + " move: row, col").trim().split(",");
            const row = parseInt(playerMove[0].trim());
            const col = parseInt(playerMove[1].trim());

            Gameboard.placeToken(row, col, activePlayer.getToken());

            await sleep(100);
            gameOver = Gameboard.checkWin(row, col, activePlayer.getToken());
            switchPlayer();
            Gameboard.printBoard();
        }
        switchPlayer();
        console.log("winner: " + activePlayer.getName());
    }

    return {playGame};
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// ------------------- Game Flow --------------------------------

const playGameBtn = document.getElementById("play-game-btn");
playGameBtn.addEventListener("click", function(){
    GameController.playGame(); 
}); //third commit test
