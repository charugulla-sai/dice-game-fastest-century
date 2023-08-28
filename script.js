'use strict';

// Starting variables
let currentScore = 0;
const totalScore = [0, 0];
let activePlayer = 0;
let playing = true;


// Element selection
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const imgDiceEl = document.querySelector('.dice');
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector('.player--1');

let winner = player0El;
let looser = player1El;

// Button selection
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Functions
function changeActivePlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Event listners

// ROLL DICE button click event
rollDiceBtn.addEventListener('click', function () {
  // 1. Generate random number between 0 to 6 inclusive.
  const randomNumber = Math.trunc(Math.random() * 7);
  console.log(randomNumber);

  // 2. Add random number to current score and display it
  if (randomNumber !== 0) {
    // Add random number to current score and display it
    currentScore += randomNumber;

    //  Display dice image
    imgDiceEl.setAttribute('src', `./img/dice-${randomNumber}.png`);
  } else {
    //  Display dice image
    imgDiceEl.setAttribute('src', `./img/bomb.png`);

    // Set current score to 0 and display it
    currentScore = 0;
    (activePlayer === 0 ? current0El : current1El).textContent = currentScore;

    // Change the active player
    changeActivePlayer();
  }

  (activePlayer === 0 ? current0El : current1El).textContent = currentScore;
});

// HOLD button click event
holdBtn.addEventListener('click', function () {
  totalScore[activePlayer] += currentScore;
  // add current score to the total score of active player and display it
  (activePlayer === 0 ? score0El : score1El).textContent =
  totalScore[activePlayer];

  // Set current score to 0 and display it
  currentScore = 0;
  (activePlayer === 0 ? current0El : current1El).textContent = currentScore;
  if (totalScore[activePlayer] < 100) {

    // Change the active player
    changeActivePlayer();
  } else {
     winner = activePlayer === 0 ? player0El : player1El;
     looser = activePlayer === 0 ? player1El : player0El;
    winner.classList.add('player--winner');
    looser.classList.add('hidden');

    imgDiceEl.classList.add('hidden');
    rollDiceBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
  }
});

// NEW GAME button click event
newGameBtn.addEventListener('click', function () {
  currentScore = 0;
  totalScore[0] = 0;
  totalScore[1] = 0;

  score0El.textContent = totalScore[0];
  score1El.textContent = totalScore[1];

  imgDiceEl.classList.remove('hidden');
    rollDiceBtn.classList.remove('hidden');
    holdBtn.classList.remove('hidden');

    winner.classList.remove('player--winner');
    looser.classList.remove('hidden');
});
