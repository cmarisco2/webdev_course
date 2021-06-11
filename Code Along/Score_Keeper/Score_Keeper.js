
// Buttons. 
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const reset = document.querySelector('#reset');
//Score board.
const score1 = document.querySelector('#p1');
const score2 = document.querySelector('#p2');
//score to win.
const totalSelector = document.querySelector('#gameTotal');
//storage for the total score at this point.
let gameTotal;

//Button functiions:
btn1.addEventListener('click', (e) => {
    let runningTotal = parseInt(score1.innerText);
    if (gameTotal && runningTotal < gameTotal) {
        score1.innerText = runningTotal + 1;
    }
    if (gameTotal && parseInt(score1.innerText) === gameTotal) gameOver(score1, score2);
});

btn2.addEventListener('click', (e) => {
    let runningTotal = parseInt(score2.innerText);
    if (gameTotal && runningTotal < gameTotal) {
        score2.innerText = runningTotal + 1;
    }
    if (gameTotal && parseInt(score2.innerText) === gameTotal) gameOver(score2, score1);
});

//reset button.
reset.addEventListener('click', gameReset);

//Selector event that updates total score with the current option.
totalSelector.addEventListener('change', (e) => {
    // capture value of the selector.
    gameTotal = parseInt(e.target.value);
    //resets game if a lower total score is selected than either current score.
    if (gameTotal <= parseInt(score2.innerText) || gameTotal <= parseInt(score1.innerText)) {
        gameReset();
    }
    //allows to continue current game after initial victory, if a higher limit is selected. 
    if (btn1.disabled || btn2.disabled) {
        gameContinue();
    }
});

function gameReset() {
    //reset scores
    scoreReset();
    //Continue Game.
    gameContinue();
}

function scoreReset() {
    score1.innerText = 0;
    score2.innerText = 0;
}

function gameContinue() {
    //reset colors
    score1.style.color = 'black';
    score2.style.color = 'black';
    //enable buttons
    btn2.disabled = false;
    btn1.disabled = false;
}

const gameOver = (winner, loser) => {
    btn1.disabled = true;
    btn2.disabled = true;
    winner.style.color = 'green';
    loser.style.color = 'red';
}