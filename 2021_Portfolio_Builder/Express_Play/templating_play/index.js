/**
 * TEMPLATING INSTRUCTIONS:
 * 
 * SETTING EXPRESS for TEMPLATING (with EJS):
 * 1) install ejs via npm 
 * 2) set express' 'view engine' to 'ejs' with app.set()
 * 3) make 'views/' directory in the top level of the project directory.
 * 
 * 
 * SETTING THE VIEWS DIRECTORY:
 * -This is to ensure that the program can be run outside the project folder.
 * 1) import path module.
 * 2) set views directory with app.set('views', path.join())
 * 
 * BEGIN TEMPLATING:
 * -make the html templates in the views directory ending in a .ejs extension
 * ---ex: views/home.ejs
 * 
 * -in the route that will direct to the view, use render() method of the response *object
 * ---ex: res.render('home') or res.render('home.ejs')
 * 
 * Note: Can use spread operator (ex:...array) to get values passed to the template
 */
const express = require('express');
const app = express();
const path = require('path');

/**
 * Serving Static Assets (like Styles) with middleware: 
 * --ex: express.static('public') within app.use()
 * Set the directory similar to views. Done in 1 step below
 */
app.use(express.static(path.join(__dirname, 'public')));



//Basic Example: '/' home route views the home.ejs html page
app.get('/', (req, res) => {
    res.render('home');
});

// Sending Data to the EJS template:
// First arg of res.render -> ejs page
// Second arg of res.send() -> object w/ values we assign
app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num });
});

// Looping through collection in names.ejs
app.get('/names', (req, res) => {
    const names = [
        'Eren Jaegar',
        'Gon Frieks',
        'Goku',
        'Booker DeWitt'
    ];

    res.render('names', {names});
});

// using params and rendering
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', {subreddit});
});

//Resets views value to be the second arg
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});