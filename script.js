// -------------------------- Objects -----------------------
const Gameboard = (function () {

    let board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    let gridContainer = document.querySelector(".grid-container");

    // add event listeners to the grid squares
    for(let i = 0; i < 9; i++){
        let curChild = gridContainer.children[i];
        curChild.addEventListener("click", function(){
            GameController.takeTurn(Math.floor(i / 3), (i % 3));
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

    // return true if a win was found and false otherwise.
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
        if (board[0][0] == token && board[1][1] == token && board[2][2] == token) {
            return true;
        }
        // check diagonal top-right to bot-left
        if (board[0][2] == token && board[1][1] == token && board[2][0] == token){
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

    function showWinnerPopup(winnerName){
        // Create a div element for the popup
        const popup = document.createElement('div');
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.position = 'fixed';
        popup.style.top = '11%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.padding = '20px';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = 'white';
        popup.style.fontSize = '24px';
        popup.style.textAlign = 'center';
        popup.style.borderRadius = '10px';
        popup.style.zIndex = '1000'; // Ensure it appears above other content
        popup.innerHTML = winnerName + ' Wins!!!';

        // Create a button to close the popup
        const closeButton = document.createElement('button');
        closeButton.innerHTML = 'Play Again';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '10px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';

        // Add an event listener to the button to remove the popup
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
            GameController.setupGame();
        });

        // Append the button to the popup
        popup.appendChild(closeButton);

        // Append the popup to the body
        document.body.appendChild(popup);
    }


    const player1 = createPlayer("Player_1", "X");
    const player2 = createPlayer("Player_2", "O");
    let activePlayer = player1;
    let gameActive = false;

    function setupGame(){
        Gameboard.resetBoard(); // TODO: check that this function resets the values in the html grid squares
        Gameboard.printBoard();
        gameActive = true;
        activePlayer = player1;
    }

    function takeTurn(row, col){
        if (gameActive == false){
                return false;
        }

        let validMove = Gameboard.placeToken(row, col, activePlayer.getToken());
        Gameboard.printBoard();
        if (validMove == false){
            console.log("Square already taken");
        }
        else{
            let winFound = Gameboard.checkWin(row, col, activePlayer.getToken());
            if (winFound == true){
                gameActive = false;
                console.log(activePlayer.getName() + " Wins!!!");
                showWinnerPopup(activePlayer.getName());
            }
            else{
                switchPlayer();
            }
        }
    }

    return {setupGame, takeTurn};
})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ------------------- Game Flow --------------------------------

const playGameBtn = document.getElementById("play-game-btn");
playGameBtn.addEventListener("click", function(){
    GameController.setupGame(); 
}); 
