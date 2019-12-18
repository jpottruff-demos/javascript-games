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
const largeTiles = document.getElementsByClassName('largeTile'); 
const smallBoards = document.getElementsByClassName('smallBoard');

const gameMessage = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');

let smallTiles;

//Game State Variables
let smallEmptyCells = [9, 9, 9, 9, 9, 9, 9, 9, 9];
let largeEmptyCells = 9;
let smallGameOver = [false, false, false, false, false, false, false, false, false];

// let isPlaying = true;			// change this name
let activeLarge;
let player = 'X';




/**INITIAL STATE**/
addClickListeners(largeTiles, startGame);
resetButton.addEventListener("click", resetGame);



/** FUNCTIONS **/
function addClickListeners(target, handler){
	for (let i = 0; i < target.length; i++){
		target[i].addEventListener("click", handler);
    }
}

function removeClickListeners(target, handler){
	for (let i = 0; i < target.length; i++){
		target[i].removeEventListener("click", handler);
    }
}

function startGame() {
  activeLarge = getCellClicked(this, largeTiles);
  removeClickListeners(largeTiles, startGame);
  console.log(activeLarge);
  playSmallBoard(smallBoards[activeLarge]);
  
}

function resetGame() {
  console.log('reset');
}

function getCellClicked(cell, target) {
	for (let i = 0; i < target.length; i++) {
		if (cell === target[i]){
			return i;
		}
	}
}

function playSmallBoard(board) {
	if (!smallGameOver[activeLarge]) {
  		setBoardStyles();
		smallTiles = board.getElementsByTagName("td");
		console.log('playing small');
		addClickListeners(smallTiles, playerMove);
  	}  else {
  		//click listeners on all large
  		console.log('chose a board');

  		for (let i = 0; i < largeTiles.length; i ++) {
	  		largeTiles[i].style.backgroundColor = "#323330";
	  		let childBoard = largeTiles[i].getElementsByTagName("td");
	  		for (let i = 0; i < childBoard.length; i++) {
	  			childBoard[i].style.borderColor = "#A357B6";
	  		} 
    	}

    	chooseLargeTile();
  		//addClickListeners(largeTiles, chooseLargeTile);
  	}

}

function chooseLargeTile() {

	//FIXME
	largeTiles.forEach(function (tile) {
		console.log('this' + tile);
	});
	// addClickListeners(largeTiles, function() {
	// 	console.log('clicked large');
	// });
}

function setBoardStyles() {

  	//sets out-of-play boards styles
  	for (let i = 0; i < largeTiles.length; i ++) {
  		largeTiles[i].style.backgroundColor = "#323330";
  		let childBoard = largeTiles[i].getElementsByTagName("td");
  		for (let i = 0; i < childBoard.length; i++) {
  			childBoard[i].style.borderColor = "rgba(79, 39, 89)";
  		} 
    }

    //sets in-play board styles
  	largeTiles[activeLarge].style.backgroundColor = "rgba(141, 115, 12, 0.3)";
  	//largeTiles[activeLarge].focus();			//NOTE: must have tab index to use this on td element (LINE 43 css)
  	let currentBoard = largeTiles[activeLarge].getElementsByTagName("td");
  	for (let i = 0; i < currentBoard.length; i++) {
  		currentBoard[i].style.borderColor = "#A357B6";
  	} 
}

function playerMove() {
	if (this.innerHTML == "") {

		//get move, place player and do not allow any more clicks on small table
		let move = getCellClicked(this, smallTiles); 				//use this later to set up large active
		//console.log(move);
		this.innerHTML = player;
		removeClickListeners(smallTiles, playerMove);

		//check wins and change game state variables
		smallEmptyCells[activeLarge] -= 1;							//change before getting game state
		let currentGameState = getGameState(smallTiles);
		//console.log(currentGameState);
		if (currentGameState ==="win" || currentGameState == "tie") {
			smallGameOver[activeLarge] = true;
			largeEmptyCells -= 1;
			//console.log(largeEmptyCells);
			let largeToken;
			(currentGameState === "win") ? largeToken = player : largeToken = "-";
			//NOTE: need to have smallBoard as a class so the smallBoards array does not end up with 1 less element
			largeTiles[activeLarge].innerHTML = '<span class="smallBoard largeToken">' + largeToken + '</span>';
		}

		(player === "X") ? player = "O" : player = "X";

		//set new active large based on move (cant really test this without taking listeners off - stuff breaks)
		console.log('al = ' + activeLarge);
		activeLarge = move; 
		console.log('al = ' + activeLarge);
		playSmallBoard(smallBoards[activeLarge]);

	} else {
		//console.log('already taken');
		return;
	}
}

function getGameState(board) {
	if (checkWin(board)) {
		return "win";
	} else if (checkTie(activeLarge)) {
		return "tie";
	} else {
		return "inProgress";
	}
}

function checkWin(board) {
  console.log('checking winner');
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

function checkTie(boardNo) {
  console.log('checking tie');
  if (smallEmptyCells[boardNo] == 0) {
    return true;
  }
}

















//REDO BELOW HERE


/** FUNCTIONS **/

// function cellClicked() {
//   if (this.innerHTML === "" && isPlaying === true) {
//     this.innerHTML = player;
//     emptyCells -= 1;
//     let message;

//     if (checkWin()) {
//       message = "Congratualtions Player " + player + ", you win!";
//       gameOver(message);
//     } else if (checkTie()){
//       message = "Game Over. It's a tie!"
//       gameOver(message);
//     } else {
//       (player === "X") ? player = "O" : player = "X";
//       gameMessage.innerHTML = "Player " + player + ", it's your turn.";
//     }
//   }
//}





function gameOver(message) {
  isPlaying = false;
  gameMessage.innerHTML = message;
}

function resetGGGGGame() {
  isPlaying = true;
  emptyCells = 9;
  for(let i = 0; i < board.length; i++) {
    board[i].innerHTML = "";
  }
  gameMessage.innerHTML = "Player " + player + ", it's your turn.";
}







/*
//VARIABLES


//FUNCTIONS

var largeTokens;["", "", "", "", "", "", "", "", ""]; //array to keep track of winning tokens on board - IMPROVE LATER

function clickLarge(cell){

		//highlights currently selected large cell, clears others of any previous highlighting
		//also assigns a number to the largeSelected variable (used in functions that follow)
		for (var i = 0; i < largeBoard.length; i++){
			if (cell === largeBoard[i]) {
				largeBoard[i].style.backgroundColor = "rgba(190, 190, 190, 0.5)"; //highlighting current large cell
				largeSelected = i;
			} else {
				largeBoard[i].style.backgroundColor = "white";
			}

		}

	//FIXME: need to add somethign that ensures when user clicks on a large cell that has previously been clicked, the small cell will not be selected automatically, find work around for this...or
		//OR ensure user is sent to largecell that correpsonds with last user's move (Option chosen depends on which rules are being followed)

	currentBoard = largeBoard[largeSelected].getElementsByTagName("td"); //referencing the smallBoard in current large cell clicked, creates an array of "td" elements


	//event listener for currentBoard (in this large cell)
	for (var i = 0; i < currentBoard.length; i++){
		currentBoard[i].addEventListener("click", function() {smallCellClicked(this);})
	}
	//note: will now go to smallCellclicked

}


function smallCellClicked(cell){
	//checks to see if space clicked is open
	if (cell.innerHTML === "") {

		smallEmptyCells[largeSelected] -= 1; 					//removes one empty cell from emptycell counter; see smallEmptyCells array
		cell.innerHTML = player;								//changes cell clicked to player's token
		smallCheckWin();										//checks to see if this small board has a winner; see smallCheckWin function
		player = (player == "X") ? "O" : "X";					//changes player token
		document.getElementById("player").innerHTML = player;	//change player display in HTML

	}

}

function smallCheckWin(){

	//outcome for wins
	for ( i = 0; i < winningCombos.length; i++) {
        if (currentBoard[winningCombos[i][0]].innerHTML == currentBoard[winningCombos[i][1]].innerHTML
            && currentBoard[winningCombos[i][1]].innerHTML == currentBoard[winningCombos[i][2]].innerHTML
            && currentBoard[winningCombos[i][0]].innerHTML != "") {
				largeBoard[largeSelected].innerHTML = '<span class="largeToken">' + player + '</span>'; //changes large board to winning player token
					//FIXME IDEA: maybe try adding in a parentElement.removeChild (smallGame) here (see personal notes) - could maybe use same ceck win for large cells later on ??
				smallGameOver[largeSelected] = true;

				//largeCheckWin();		//broken
				break;				// no longer need to evaluate
			}
	}

	//outcome for draws
	if (smallEmptyCells[largeSelected] === 0 && smallGameOver[largeSelected] == false) {
		largeBoard[largeSelected].innerHTML = '<span class="largeToken">-</span>';	// changes large board to blocked square
		smallGameOver[largeSelected] = true;
		//largeCheckWin();					//broken
		}
}



//FIXME - won't pick up winning combos/draws on largeBoard - displays message at wrong time

function largeCheckWin(){
	//NOTE: clarify logic for this 'for statement' taken from: http://codepen.io/ProfWendi/pen/MJyRyB?editors=0110 , modified to fit exisitng code
    console.log("in large check win");
	for ( i = 0; i < winningCombos.length; i++) {
        if (largeBoard[winningCombos[i][0]].innerHTML == largeBoard[winningCombos[i][1]].innerHTML
            && largeBoard[winningCombos[i][1]].innerHTML == largeBoard[winningCombos[i][2]].innerHTML
            && largeBoard[winningCombos[i][0]].innerHTML != '') {
				document.getElementById("winner").innerHTML = "Game Over! Player " + player + " wins!";
				largeGameOver = true;
				break;				// no longer need to evaluate
			}
	}

	//outcome for draws
	if (largeEmptyCells === 0 && largeGameOver == false) {
		document.getElementById("winner").innerHTML = "Game over. It's a draw!"; //MODIFY

		largeGameOver[largeSelected] = true;

		}
}



///EVENTS

//listens for click on large cells - shows which large cell was selected via function
	for (var i = 0; i < largeBoard.length; i++){
			largeBoard[i].addEventListener("click", function() {clickLarge(this);});	//note: passing in this object(ie. cell clicked) to anonymous function that passes it into the clickLarge function
	}
*/
