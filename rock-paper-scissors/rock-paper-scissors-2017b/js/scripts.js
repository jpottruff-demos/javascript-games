/** VARIABLES **/
const userChoice = document.getElementById('userChoice');
const userToken = document.getElementById('userToken');
const computerToken = document.getElementById('computerToken');
const result = document.getElementById('result');
const resetButton = document.getElementById('resetScores');

const userImg = document.createElement('img');
const computerImg = document.createElement('img');

let playerScore = 0;
let computerScore = 0;


/** EVENT LISTENERS **/
userChoice.addEventListener("change", playGame);
userChoice.selectedIndex = "-1";
resetButton.addEventListener("click", resetScores);

/** FUNCTIONS **/
function playGame() {
  let userMove = getUserMove();
  let computerMove = getComputerMove();
  let winner = getWinner(userMove, computerMove);

  displayResults(userMove, computerMove, winner);
  updateScores();

  userChoice.selectedIndex = "-1";
}

function getUserMove() {
  let selection = userChoice.value;
  console.log(selection);
  return selection;
}

function getComputerMove() {
  let random = Math.random();
  	if (random < 0.34){
      console.log("rock");
      return "rock";
  	} else if (random < 0.67){
      console.log("paper");
      return "paper";
  	} else {
      console.log("scissors");
      return "scissors";
    }
}

function getWinner(u, c) {
  if (u === c) {
      userToken.setAttribute('class', 'tie');
      computerToken.setAttribute('class', 'tie');
      return "Tie";
  }

  if ((u === "rock" && c === "scissors") || (u === "paper" && c === "rock") || (u === "scissors" && c === "paper")) {
    playerScore += 1;
    userToken.setAttribute('class', 'winner');
    computerToken.setAttribute('class', 'loser');
    return "Player";
  }

  userToken.setAttribute('class', 'loser');
  computerToken.setAttribute('class', 'winner');
  computerScore += 1;
  return "Computer";
}

function displayResults(userMove, computerMove, winner) {
  let resultMsg;
  (winner === "Tie") ? resultMsg = "It's a tie!" : resultMsg = winner + " wins!";

  userImg.src = "images/" + userMove + ".png";
  computerImg.src = "images/" + computerMove + ".png";
  userToken.appendChild(userImg);
  computerToken.appendChild(computerImg);
  result.innerHTML = resultMsg;
}

function updateScores() {
  document.getElementById("playerScore").innerHTML = playerScore;
  document.getElementById("computerScore").innerHTML = computerScore;
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
}
