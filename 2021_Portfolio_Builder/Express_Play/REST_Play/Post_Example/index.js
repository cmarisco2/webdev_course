const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/**
 * USES PARAMS
 * -get has a character limit
 * -get sends info in clear over url (like query string)
 * --ex: const {subreddit} = req.params;
 * --ex: const {q} = req.query;
 * 
 * Requests Data
 */
app.get('/tacos', (req, res) => {
    res.render('tacos');
});

/**
 * USES BODY
 * -NEEDS EXPRESS CONFIGURED FOR THE TYPE OF DATA (forms, json):
 * --forms: app.use(express.urlencoded({extended: true}))
 * --json: app.use(express.json())
 * -no character limit
 * -sends info behind the scenes
 * --ex: const {tacos , qty} = req.body;
 * 
 * Posts/Publishes Data
 */
app.post('/tacos', (req, res) => {
    const {tacos, qty} = req.body;
    res.render('tacos', {tacos, qty});
});



app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
});