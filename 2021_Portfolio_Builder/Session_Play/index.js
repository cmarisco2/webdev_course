/**
 ** Demo: Sessions.
 ** Require module, use middleware, pass in options
 *  
 */
const express = require('express');
const app = express();

//* Require module, use middleware:
const session = require('express-session');
const { use } = require('express/lib/application');
const sessionOptions = { secret: 'secretKey', resave: false, saveUninitialized: false }; //? Options to rid of depracation warnings.
app.use(session(sessionOptions));

//* Session Route tip - adding a property to the session object to reuse on each visit
app.get('/viewcount', (req, res) => {
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`Your View Count, Sir? \n It's ${req.session.count}`);
});

//* Save Query A:
//* 1 - Get Query String (default if not there)
//* 2 - Add to sessions object
app.get('/register', (req, res) => {
    const { username = 'Ricky Bobby' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
});
//* Save Query B:
//* 3 - Deconstruct from the sessions object
app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome Back, ${ username }`);
});

app.listen(3000, () => {
    console.log("Serving From Port 3000");
});