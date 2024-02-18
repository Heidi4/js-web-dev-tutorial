
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
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// Add event listeners
// ROCK BUTTON
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
// PAPER BUTTON 
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
// SCISSORS BUTTON
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });
// RESET BUTTON
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });
// AUTO PLAY BUTTON
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });


// Event listener on the BODY
console.log()
document.body.addEventListener('keydown', (event) => { // EVENT OBJECT
  console.log(event.key)
  if (event.key === 'r' || event.key === 'R') {
    
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  } else if (event.key === 'a' || event.key === 'S') {
    autoPlay();
  } else if (event.key === 'Backspace') {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
})

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
