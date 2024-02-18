
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};// converts to JS object, also use the default operator || OR
// Gives a default value when we rest the score and tries to retrieve anything form localStorage
/*// if (score === null) {
if (!score) {
  score = {
    wins: 0, 
    losses:0, 
    ties:0
  };
}*/
// Using DOM to insert the score to the page
updateScoreElement();

function playGame(playerMove) {
  //1. Generate random computer move

  const computerMove = pickComputerMove();

  //2. compare the computer and your move

  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // 3. update the score
  if (result === 'You win.') {
    // score.wins = score.wins + 1
    score.wins += 1
  } else if (result === 'You lose.') {
    score.losses += 1
  } else if (result === 'Tie.') {
    score.ties += 1
  }
  // Save to localStorage - only supports strings
  localStorage.setItem('score', JSON.stringify(score)) // convert to JSON object string
  // Update on the page 
  updateScoreElement();

  // 4. Popup to store result and score
  document.querySelector('.js-result').innerHTML = result;

  // Add the images 
  document.querySelector('.js-moves').innerHTML = `You ${playerMove} - ${computerMove} Computer`;
}
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;
}
// let computerMove = '';// Global variable
//function for selecting the computer move to simply fy the redundant code we did with the buttons
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  // Generate computer move
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}
