/**
 * Testing NPM package install.
 */
const jokes = require('give-me-a-joke');
// console.log(jokes);

jokes.getRandomDadJoke((joke) =>{
    console.log(joke);
});