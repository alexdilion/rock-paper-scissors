// randomly generate a computer selection
function getComputerSelection() {
  // generate a random number between 1 and 3
  let randomNumber = Math.floor(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
  }
}

// play a round
// returns an array with a message and the round outcome [message, outcome]
function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  // check if selections are not tied
  if (playerSelection != computerSelection) {
    switch (playerSelection) {
      case "rock":
      case "r":
        if (computerSelection == "scissors") {
          return ["You win! Rock beats scissors.", "win"];
        } else {
          return ["You lose! Paper beats rock.", "loss"];
        }
      case "paper":
      case "p":
        if (computerSelection == "rock") {
          return ["You win! Paper beats rock.", "win"];
        } else {
          return ["You lose! Scissors beats paper.", "loss"];
        }
      case "scissors":
      case "s":
        if (computerSelection == "paper") {
          return ["You win! Scissors beats paper.", "win"];
        } else {
          return ["You lose! Rock beats scissors.", "loss"];
        }
      default:
        alert("Enter a valid selection!");
        break;
    }
  } else {
    return ["Tie!", "tie"];
  }
}

// check whether player won or lost
function checkWinner(playerWins, playerLosses) {
  if (playerWins > playerLosses) {
    return "You win!";
  } else if (playerWins < playerLosses) {
    return "You lost :(";
  } else {
    return "Draw!";
  }
}

// main function
function game(roundNumber = 5) {
  let playerWins = 0;
  let playerLosses = 0;

  // play game for x number of rounds
  for (let i = 0; i < roundNumber; i++) {
    // get input
    let playerSelection = prompt("Enter rock, paper or scissors:");
    let computerSelection = getComputerSelection();

    let result = playRound(playerSelection, computerSelection);

    // check round outcome
    if (result[1] == 'win') {
      playerWins += 1;
    } else if (result[1] == 'loss')
      playerLosses += 1;
    else {
      // if we get a tie, loop until the tie is broken
      while (true) {
        playerSelection = prompt("You tied! Enter rock, paper or scissors:");
        computerSelection = getComputerSelection();

        result = playRound(playerSelection, computerSelection);

        if (result[1] == "win") {
          playerWins += 1;
          break;
        } else if (result[1] == "loss") {
          playerLosses += 1;
          break;
        }
      }
    }

    // output round outcome message
    console.log(result[0]);
  }

  // output end of game message
  console.log(`${checkWinner(playerWins, playerLosses)} \nYou scored ${playerWins} wins and ${playerLosses} losses.`);
}

let roundNumber = +prompt("How many rounds of 'Rock! Paper! Scissors!' would you like to play?");
game(roundNumber);