// While loop with a prompt guessing game.




let maxNumber = parseInt(prompt("Enter Max Number!"));
while (!maxNumber) {
    maxNumber = parseInt(prompt("Enter a valid Max Number!"));
}

let targetNumber = Math.floor(Math.random() * maxNumber) + 1;
console.log(targetNumber);

let guessNumber = parseInt(prompt("Enter total number of guesses allowed"));
while (!guessNumber) {
    guessNumber = parseInt(prompt("Enter a valid number of guesses!"));
}

let currentGuess = parseInt(prompt(`Enter a valid number between 1 and ${maxNumber}`));
while (!currentGuess) {
    currentGuess = parseInt(prompt("Enter a valid number!"));
}



let guessTotal = 1;
while (guessTotal < guessNumber && parseInt(currentGuess) !== targetNumber) {
    if (currentGuess === 'q') break;
    alert(`current guess ${guessTotal}`)
    guessTotal++;
    if (currentGuess === NaN) {
        currentGuess = prompt("Enter a valid number!");
    } else {
        currentGuess = prompt("Sorry, that is incorrect. Please enter another number: ");
    }
}

if (guessTotal >= guessNumber) {
    console.log(`Sorry, you used all ${guessNumber} guesses :(`);
} else {
    console.log(`Congratulations! You found the secret number ${targetNumber} in ${guessTotal} attempts!`);
}
