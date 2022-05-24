'use strict';

// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

// functuiions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // لما بنغير اللاعب بنحتاج نغير ال score ترجع
  currentScore = 0;
  // علشان يغير ال Actie player
  activePlayer = activePlayer === 0 ? 1 : 0; //لو اللاعب === 0 وده الطبيعي يبقي هيساوي 1 وبعد كده هيساوي 0

  // toggle لو الكلاس ده موجود بتشيله لو مش موجود بتحطه
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  // make the score start from 0

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // hide the dice
  diceEl.classList.add('hidden');
};

init();

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1- generat random dice row
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2- display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3- check role 1 : if true switch
    if (dice !== 1) {
      // add dice to cuurent score
      currentScore += dice;
      // علشان ادي النتيجة للاعب اللي بيلعب ف وقتها
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add cuurent score to active player
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
