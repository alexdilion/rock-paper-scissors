const roundOutcomes = {
    rock: { rock: "tie", paper: "loss", scissors: "win" },
    paper: { rock: "win", paper: "tie", scissors: "loss" },
    scissors: { rock: "loss", paper: "win", scissors: "tie" },
};

const buttons = [...document.querySelectorAll(".rps-button")];

let gameState = document.querySelector("#game-state");
let playerScoreCounter = document.querySelector("#player-score");
let computerScoreCounter = document.querySelector("#computer-score");
let turnHistory = document.querySelector("#turn-history");

let currentTurnElement;

let playerWins = 0;
let computerWins = 0;

// randomly generate a computer selection
function getComputerSelection() {
    const choices = ["rock", "paper", "scissors"];
    // generate a random number between 1 and 3
    let randomNumber = Math.floor(Math.random() * 3);

    return choices[randomNumber];
}

// update game state, win counters and output turn outcome to history
function outputResult(outcome, playerSelection) {
	gameState.textContent = `You ${outcome}!`;

	playerScoreCounter.textContent = playerWins;
	computerScoreCounter.textContent = computerWins;

	if (currentTurnElement !== undefined) {
		currentTurnElement.removeAttribute("id");
	}

	let newElement = document.createElement("li");
	newElement.id = "current-turn";
	newElement.textContent = `You chose ${playerSelection} and ${outcome}`;

	currentTurnElement = newElement;
	turnHistory.appendChild(newElement);
}

// play a round
function playRound(playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = getComputerSelection();

	// Set page images to relevant images

    let outcome = roundOutcomes[playerSelection][computerSelection];

    if (outcome === "win") {
        playerWins++;
		// Output to history that player won
    } else if (outcome === "loss") {
        computerWins++;
		// Output to history that player lost
    } else {
		// Output to history that player tied
	}
}

function onButtonClicked(e) {
    const button = e.target;
    let playerSelection = button.id;

    if (playerWins < 5 && computerWins < 5) {
        playRound(playerSelection);
    } else {
        let answer = prompt("Do you want to play again? (y/n)");

        if (answer === "y") {
            computerWins = 0;
            playerWins = 0;
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", onButtonClicked);
});
