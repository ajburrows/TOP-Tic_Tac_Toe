// -------------------------- Objects -----------------------
const Gameboard = (function () {

    let board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    let gridContainer = document.querySelector(".grid-container");

    // add event listeners to the grid squares
    for(let i = 0; i < 9; i++){
        let curChild = gridContainer.children[i];
        curChild.addEventListener("click", function(){
            GameController.requestMove(Math.floor(i / 3), (i % 3));
        });
    }

    const printBoard = () => {
        console.log("_" + board[0][0] + "_|_" + board[0][1] + "_|_" + board[0][2] + "_");
        console.log("_" + board[1][0] + "_|_" + board[1][1] + "_|_" + board[1][2] + "_");
        console.log(" " + board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
        console.log("\n\n");
    }

    const resetBoard = () => {
        board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
        for (let i = 0; i < 9; i++){
            gridContainer.children[i].innerHTML = " ";
        }
    }
    
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

    function requestMove(row, col){
        // if game is active, placeToken, check win, return true
        if (gameOver == false){
                return [row, col];
        }
        return false;
    }

    const player1 = createPlayer("player1", "X");
    const player2 = createPlayer("player2", "O");
    let activePlayer = player1;

    function playGame(){
        Gameboard.resetBoard(); // TODO: check that this function resets the values in the html grid squares

        Gameboard.printBoard();
        let gameOver = false;

        Gameboard.placeToken(row, col, activePlayer.getToken());

        gameOver = Gameboard.checkWin(row, col, activePlayer.getToken());
        Gameboard.printBoard();
        switchPlayer();
        console.log("winner: " + activePlayer.getName());
    }

    return {playGame, requestMove};
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------- Game Flow --------------------------------

const playGameBtn = document.getElementById("play-game-btn");
playGameBtn.addEventListener("click", function(){
    GameController.playGame(); 
}); 
