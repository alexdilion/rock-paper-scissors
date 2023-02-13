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
let playerImage = document.querySelector("#player-image");
let computerImage = document.querySelector("#computer-image");

let currentTurnElement = null;

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
function displayResult(outcome, playerSelection) {
    gameState.textContent = `You ${outcome}!`;

    playerScoreCounter.textContent = playerWins;
    computerScoreCounter.textContent = computerWins;

    if (currentTurnElement !== null) {
        currentTurnElement.removeAttribute("id");
    }

    let newElement = document.createElement("li");
    newElement.id = "current-turn";
    newElement.textContent = `You chose ${playerSelection} and ${outcome}`;

    currentTurnElement = newElement;
    turnHistory.appendChild(newElement);
}

function updateImages(playerSelection, computerSelection) {
    if (playerImage.classList.contains("transparent")) {
        playerImage.classList.remove("transparent");
        computerImage.classList.remove("transparent");
    }

    playerImage.src = `./images/${playerSelection}.png`;
    computerImage.src = `./images/${computerSelection}.png`;
}

function restart() {
    computerWins = 0;
    playerWins = 0;
    currentTurnElement = null;

    playerScoreCounter.textContent = "0";
    computerScoreCounter.textContent = "0";

    playerImage.classList.add("transparent");
    computerImage.classList.add("transparent");

    turnHistory.innerHTML = "";

	turnHistory.classList = "empty-ul";
}

// play a round
function playRound(playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let computerSelection = getComputerSelection();

    let outcome = roundOutcomes[playerSelection][computerSelection];

    updateImages(playerSelection, computerSelection);

    if (outcome === "win") {
        playerWins++;
        displayResult("won", playerSelection);
    } else if (outcome === "loss") {
        computerWins++;
        displayResult("lost", playerSelection);
    } else {
        displayResult("tied", playerSelection);
    }
}

function onButtonClicked(e) {
    const button = e.target;
    let playerSelection = button.id;

	if (turnHistory.hasChildNodes && turnHistory.classList == "empty-ul") {
		turnHistory.classList = "non-empty-ul";
	}

    if (playerWins < 5 && computerWins < 5) {
        playRound(playerSelection);
    } else {
        let answer = prompt("Do you want to play again? (y/n)");

        if (answer === "y") {
			restart();
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", onButtonClicked);
});
