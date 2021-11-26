const express = require('express');
// Factory Function?
const app = express();

/**
 * app.use() replies to anything.
 * once res.send() is reached, the function ends. Like a 'return' statement.
 */
// app.use((req, res) => {
//     console.log("Getting use on this port");
//     // res.send("Request Acknowledged");
//     res.send({color: 'red'});
// });

app.get('/', (req, res) => {
    res.send('Welcome to Rapture');
});

app.get('/bioshock', (req, res) => {
    res.send('Would You Kindly?');
});

app.get('/bioshock2', (req, res) => {
    res.send('Would You Kindly?');
});

app.get('/bioshockInfinite', (req, res) => {
    res.send('Constants and Variables');
});

/**
 * The colon in the path allows for variables that follow the pattern.
 * like "/r/MightyHarvest"
 * 
 * Must Start path with '/' and the pattern looks for further '/' too.
 */

//req.params will have the actual value of /:subreddit stored in an object.
app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    res.send(`Browsing the ${subreddit} subreddit`);
});
/**
 * Query String Found via req.query
 */

app.get('/search', (req, res) => {
    res.send(req.query);
})
/**
 * Can use a wildcard "*" for anything else that's not explicitly listed.
 * 
 * Put last because routes are matched in order
 */

app.get('*', (req, res) => {
    res.send("Sorry, I don't recognize this route");
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

//To auto-restart express after save: install nodemon globally with sudo permissions.
