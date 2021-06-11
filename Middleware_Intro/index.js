const express = require('express');
const app = express();
// New middleware:
const morgan = require('morgan');
// Use middleware:
// app.use(morgan('dev'));
// custom middleware:
app.use((req, res, next) => {
    console.log('This is my first middleware');
    next();
});

// middleware to check the http request used:
app.use((req, res, next) => {
    console.log(req.method.toUpperCase(), req.path);
    next();
});

// function to check correct query string:
const verifyPass = (req, res, next) => {
    const { password } = req.query;
    if (password === 'AOT') {
        next();
    }
    res.send('Need Correct Password');
}

// Dummy Routes
app.get('/', (req, res) => {
    res.send('HOME PAGE!');
});
// Protected Route:
app.get('/dogs', verifyPass, (req, res) => {
    res.send('Woof Woof!');
});



// 404 Middleware:
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});