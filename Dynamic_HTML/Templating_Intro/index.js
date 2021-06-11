const express = require('express');
const path = require('path');
const app = express();
const redditData = require('./data.json');
// Middleware function for sharing files.
app.use(express.static(path.join(__dirname, '/public')));

// assigning the express view engine to ejs
app.set('view engine', 'ejs');

//Allows running module outside of current folder.
// Giving access to the path from other directories
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    // res.send('Hello to local host 8080');
    res.render('home.ejs');
});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num });
});

app.get('/condrand', (req, res) => {
    const num = Math.floor(Math.random() * 100) + 1;
    res.render('condrand', { num });
});

app.get('/cats', (req, res) => {
    const cats = [
        'Garfield', 'Buddy', 'Pumpkin', 'Felix', 'Pussy'
    ];
    res.render('cats', { cats });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notFound', { subreddit });
    }
});

app.listen(8080, (req, res) => {
    console.log('Listening on port 8080');
});