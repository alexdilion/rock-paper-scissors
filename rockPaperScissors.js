const buttons = [...document.querySelector(".buttons").children];
const results = document.querySelector(".results");

let playerScoreText = document.querySelector("#playerScore");
let computerScoreText = document.querySelector("#computerScore");

const roundOutcomes = {
  "rock": {"rock": "tie", "paper": "loss", "scissors": "win"},
  "paper": {"rock": "win", "paper": "tie", "scissors": "loss"},
  "scissors": {"rock": "loss", "paper": "win", "scissors": "tie"}
}

let playerWins = 0;
let computerWins = 0;

// randomly generate a computer selection
function getComputerSelection() {
  const choices = ["rock", "paper", "scissors"];
  // generate a random number between 1 and 3
  let randomNumber = Math.floor(Math.random() * 3);
  
  return choices[randomNumber];
}

// update text score
function displayScore() {
  playerScoreText.textContent = playerWins;
  computerScoreText.textContent = computerWins;
}

// play a round
function playRound(playerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = getComputerSelection();

  // get round outcome
  let outcome = roundOutcomes[playerSelection][computerSelection]

  if (outcome === "win") {
    playerWins++;
    displayScore();
  } else if (outcome === "loss") {
    computerWins++;
    displayScore();
  }
}

function buttonPressed(e) {
  const button = e.target;
  let playerSelection = button.id;

  if (playerWins < 5 && computerWins < 5) {
    playRound(playerSelection);
  } else {
    let answer = prompt("Do you want to play again? (y/n)");
    
    if (answer === "y") {
      computerWins = 0;
      playerWins = 0;
      displayScore();
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', buttonPressed)
})