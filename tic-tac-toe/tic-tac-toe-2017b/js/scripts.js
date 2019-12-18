/** VARIABLES **/
const winningCombos = [ [0, 1, 2],    //horizontal
                        [3, 4, 5],
                        [6, 7, 8],
				                [0, 3, 6],    //verical
                        [1, 4, 7],
                        [2, 5, 8],
				                [0, 4, 8],    //diagonal
                        [2, 4, 6]
				              ];

const board = document.getElementsByTagName('td');
const gameMessage = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');

let isPlaying = true;
let player = 'X';
let emptyCells = 9;



/** LISTENERS **/
//adding click event listeners to all board sqaures (td elements)
for (let i = 0; i < board.length; i++){
		board[i].addEventListener("click", cellClicked)
}

resetButton.addEventListener("click", resetGame);



/** FUNCTIONS **/

function cellClicked() {
  if (this.innerHTML === "" && isPlaying === true) {
    this.innerHTML = player;
    emptyCells -= 1;
    let message;

    if (checkWin()) {
      message = "Congratualtions Player " + player + ", you win!";
      gameOver(message);
    } else if (checkTie()){
      message = "Game Over. It's a tie!"
      gameOver(message);
    } else {
      (player === "X") ? player = "O" : player = "X";
      gameMessage.innerHTML = "Player " + player + ", it's your turn.";
    }
  }
}

function checkWin() {
  for (let i = 0; i < winningCombos.length; i++){
    //return true if winning combo found
     if (board[winningCombos[i][0]].innerHTML == board[winningCombos[i][1]].innerHTML
         && board[winningCombos[i][1]].innerHTML == board[winningCombos[i][2]].innerHTML
         && board[winningCombos[i][0]].innerHTML != "") {
           return true;
         }
  }
  return false;
}

function checkTie() {
  if (emptyCells == 0) {
    return true;
  }
}

function gameOver(message) {
  isPlaying = false;
  gameMessage.innerHTML = message;
}

function resetGame() {
  isPlaying = true;
  emptyCells = 9;
  for(let i = 0; i < board.length; i++) {
    board[i].innerHTML = "";
  }
  gameMessage.innerHTML = "Player " + player + ", it's your turn.";
}
