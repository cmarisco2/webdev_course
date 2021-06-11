const express = require('express');
const app = express();
// console.dir(app);

// on any incoming request. This method runs.
//also, has access to the request & response objects via callback args.
// app.use((req, res) => {
//     console.log('New Request');
//     // console.dir(req);
//     res.send({ color: 'red' });
// });


// Routing to specific path:
// '/' -> name are extensions onto the host address.
app.get('/cats', (req, res) => {
    console.log('Received Cat Request');
    res.send('<h1> Meow!!! </h1>');
});

app.get('/dogs', (req, res) => {
    console.log('Received Dog Request');
    res.send('<h1> Wolf </h1>');
});

app.post('/dogs', (req, res) => {
    console.log('Dog Post');
    res.send('<h1> Dog Post </h1>');
});


// HOME:
app.get('/', (req, res) => {
    console.log('Welcome Home');
    res.send("Welcom to the Home Page");
});

//PATTERN DEFINED RESPONSE
//similar to a subreddit (r/cats, r/dogs, etc)
// Uses pattern to recognize page(via ':' colon) vice hardcoding
// access to the ":subreddit" variable is through the req object's params property.
app.get('/r/:subreddit', (req, res) => {
    console.log('Subreddit request');
    console.log(req.params);
    res.send('This is the local subreddit');
});

// Additional PATTERN with more Variables
app.get('/r/:subreddit/:postID', (req, res) => {
    const { postID, subreddit } = req.params;
    res.send(`This is the ${subreddit} subreddit with Post ID: ${postID}`);
});

// Query String:
// using 'q' as the variable name.
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing Found if Nothing Searched')
    } else {
        console.log(q);
        res.send(`Here are your search results for: ${q}`);
    }
});

// Unknown path:
// Must be last, else it will be called with the wildcard('*') on anything
app.get('*', (req, res) => {
    console.log('unknown path');
    res.send("I don't know this path");
});

// Server to Listen for requests starting at localhost:8080
app.listen(8080, () => {
    console.log('listening');
});