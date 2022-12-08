function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  
  switch (randomNumber) {
    case 0:
      return 'Rock';
    case 1:
      return 'Scissors';
    case 2:
      return 'Paper';
  }
}
 