// Can get the package name from the docs on npmjs.com
const jokes = require('give-me-a-joke');
const colors = require('colors');

// console.log(jokes);

// To get a random Chuck Norris joke
jokes.getRandomCNJoke(function (joke) {
    console.log(joke.rainbow);
});