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
          return "You win! Rock beats scissors.";
        } else {
          return "You lose! Paper beats rock.";
        }
      case "paper":
        if (computerSelection == "rock") {
          return "You win! Paper beats rock.";
        } else {
          return "You lose! Scissors beats paper.";
        }
      case "scissors":
        if (computerSelection == "paper") {
          return "You win! Scissors beats paper.";
        } else {
          return "You lose! Rock beats scissors.";
        }
      default:
        alert("Enter a valid selection!");
        break;
    }
  } else {
    return("Tie!");
  }
}

