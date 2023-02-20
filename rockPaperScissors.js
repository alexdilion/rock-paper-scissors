// Object with all possible outcomes
const roundOutcomes = {
    rock: { rock: "tie", paper: "loss", scissors: "win" },
    paper: { rock: "win", paper: "tie", scissors: "loss" },
    scissors: { rock: "loss", paper: "win", scissors: "tie" },
};

// Input buttons
const buttons = [...document.querySelectorAll(".rps-button")];

// Elements on the page
let gameState = document.querySelector("#game-state");
let playerScoreCounter = document.querySelector("#player-score");
let computerScoreCounter = document.querySelector("#computer-score");
let turnHistory = document.querySelector("#turn-history");
let playerImage = document.querySelector("#player-image");
let computerImage = document.querySelector("#computer-image");
let overlay = document.querySelector(".overlay");
let playAgainButton = document.querySelector("#button-play-again");

// Holds the current turn li, null if there are no li in turnHistory (this is for the blue highlighting)
let currentTurnElement = null;

let playerWins = 0;
let computerWins = 0;

// Get computer selection
function getComputerSelection() {
    const choices = ["rock", "paper", "scissors"];
    // generate a random number between 1 and 3
    let randomNumber = Math.floor(Math.random() * 3);

    return choices[randomNumber];
}

// Update game state and win counters and output turn outcome to history
function displayResult(outcome, playerSelection) {
    gameState.textContent = `You ${outcome}!`;

    playerScoreCounter.textContent = playerWins;
    computerScoreCounter.textContent = computerWins;

	// Takes off id for highlighting on the previous li
    if (currentTurnElement !== null) {
        currentTurnElement.removeAttribute("id");
    }

	// New li element
    let newElement = document.createElement("li");
    newElement.id = "current-turn";
    newElement.textContent = `You chose ${playerSelection} and ${outcome}`;

    currentTurnElement = newElement;
    turnHistory.appendChild(newElement);
}

// Update images for computer and player selections
function updateImages(playerSelection, computerSelection) {
    // I set the images to transparent in the restart function, I set them back to opaque here
	if (playerImage.classList.contains("transparent")) {
        playerImage.classList.remove("transparent");
        computerImage.classList.remove("transparent");
    }

    playerImage.src = `./images/${playerSelection}.png`;
    computerImage.src = `./images/${computerSelection}.png`;
}

// Reset all relevant variables and text and what not
function restart() {
    computerWins = 0;
    playerWins = 0;
    currentTurnElement = null;

    playerScoreCounter.textContent = "0";
    computerScoreCounter.textContent = "0";

    playerImage.classList.add("transparent");
    computerImage.classList.add("transparent");
	playerImage.src = ""
	computerImage.src = ""

	// Empty turnHistory ul
    turnHistory.innerHTML = "";

    turnHistory.classList = "empty-ul";
    gameState.textContent = "Pick a hand!";
}

// Play a round
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

// Ask player if they want to play again
function promptPlayAgain() {
    console.log(overlay)
    overlay.style.display = "block";
    document.querySelector("#main").classList.add("blur-element");

    let overlayHeader = document.querySelector("#game-outcome");

    if (playerWins === 5) {
        overlayHeader.classList = "win-text";
        overlayHeader.textContent = "You Have Won! :D";
    } else {
        overlayHeader.classList = "loss-text";
        overlayHeader.textContent = "You have lost! :(";
    }
}

// Run game logic after an input is given
function onButtonClicked(e) {
    const button = e.target;
    let playerSelection = button.id;

    if (turnHistory.hasChildNodes && turnHistory.classList == "empty-ul") {
        turnHistory.classList = "non-empty-ul";
    }

    if (playerWins !== 5 && computerWins !== 5) {
        playRound(playerSelection);
    } else {
		if (playerWins === 5) {
			promptPlayAgain();
		} else if (computerWins === 5) {
			promptPlayAgain();
		}
	}
}

buttons.forEach((button) => {
    button.addEventListener("click", onButtonClicked);
});

playAgainButton.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector("html").classList.remove("vignette");
    document.querySelector("#main").classList.remove("blur-element");
    restart();
})