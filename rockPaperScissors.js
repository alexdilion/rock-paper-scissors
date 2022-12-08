function getComputerChoice() {
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

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection != computerSelection) {
    switch (playerSelection) {
      case "rock":
        if (computerSelection == "scissors") {
          return ["You win! Rock beats scissors.", "win"];
        } else {
          return ["You lose! Paper beats rock.", "loss"];
        }
      case "paper":
        if (computerSelection == "rock") {
          return ["You win! Paper beats rock.", "win"];
        } else {
          return ["You lose! Scissors beats paper.", "loss"];
        }
      case "scissors":
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

function checkWinner(playerWins, playerLosses) {
  if (playerWins > playerLosses) {
    return "You win!";
  } else if (playerWins < playerLosses) {
    return "You lost :(";
  } else {
    return "Draw!";
  }
}

function game(roundNumber = 5) {
  let wins = 0;
  let losses = 0;

  for (let i = 0; i < roundNumber; i++) {
    let playerSelection = prompt("Enter rock, paper or scissors:");
    let computerSelection = getComputerChoice();

    let result = playRound(playerSelection, computerSelection);

    if (result[1] == 'win') {
      wins += 1;
    } else if (result[1] == 'loss')
      losses += 1;
    else {
      while (true) {
        playerSelection = prompt("You tied! Enter rock, paper or scissors:");
        computerSelection = getComputerChoice();

        result = playRound(playerSelection, computerSelection);

        if (result[1] == "win") {
          wins += 1;
          break;
        } else if (result[1] == "loss") {
          losses += 1;
          break;
        }
      }
    }

    console.log(result[0]);
  }

  console.log(`${checkWinner(wins, losses)} \nYou scored ${wins} round wins and ${losses} round losses.`);
}

let roundNumber = +prompt("How many rounds of 'Rock! Paper! Scissors!' would you like to play?");
game(roundNumber);