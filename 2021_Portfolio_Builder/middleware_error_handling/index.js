/**
 ** Introduction to Middleware 
 */
const express = require('express');
const app = express();

const morgan = require('morgan');

//* Middleware - from NPM
//* ex: -uses morgan, then next()
//* Runs on EVERY request
//* Note: res.anything will end a request (like a return statement) so next() won't matter in that case
app.use(morgan('dev'));


//? Custom middleware
//* next() needed OR IT's END OF THE LINE FOR THE REQUEST!
//* code after next() in the middleware will run, but after all the next()'d stack calls return.
//* unless we return next()
app.use((req, res, next) => {
    console.log("Hi Friends");
    return next();
    console.log("Hi Friends After Calling Next()!");
});

app.use((req, res, next) => {
    console.log("Here for the intermediary Log, Bro!");
    next();
});


app.get('/', (req, res) => {
    res.send("Home");
});

app.get('/dogs', (req, res) => {
    res.send("Wolf Home");
});



app.listen(8080, () => {
    console.log("Listening on Server Port 8080");
});