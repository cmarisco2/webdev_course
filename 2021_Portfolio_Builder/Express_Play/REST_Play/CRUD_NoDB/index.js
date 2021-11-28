/**
 * 
 ** REST - "Representational State Transfer"
 * C.R.U.D:
 * Create
 * Read
 * Update
 * Delete 
 * 
 **/

/**
 *
 ** Comment posting (Conventional Implementation of RESTful APIs)
 * -Note: take the property and pluralize
 * 
 ** READ All Comments:
 * GET - /comments - list all comments
 ** CREATE NEW Comment: 2 Routes
 * GET -  /comments/new
 * Post - /comments - create a new comment
 ** READ Single Comment: 'Show Route'
 * Get - /comments/:id
 ** Update Single Comment:
 * Patch - /comments/:id
 ** Edit Single Comment: (request Form to retrieve comment to patch)
 * GET - /comments/:id/edit
 ** Delete Single Comment:
 * Delete -/comments/:id
 * 
 *  
 **/

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//! Array of Objects as a pseudo database of comments.
const comments = [
    {
        id: 1,
        username: 'Eren Jaegar',
        comment: 'I just want to be free' 
    },
    {
        id: 2,
        username: 'Booker DeWitt',
        comment: 'Give us the girl, and wipe away the debt'
    },
    {
        id: 3,
        username: 'Sans',
        comment: 'LoloLolOloL'
    },
    {
        id: 4, 
        username: 'Dwayne Johnson',
        comment: 'If ya SMEELLLLLLLL!!! What the ROCK IS COOKIN'
    }
];


app.get('/', (req, res)=>{
    res.send('welcome to the home page');
});

/**
 *  Index of all comments 
 ***/
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
});

// Show Single Comment
// 1 - retrieve comment from params id
// 2 - render ejs page with the comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentObject = comments.find( c => c.id === parseInt(id));
    const {username, comment} = commentObject;
    res.render('comments/show', {username, comment, id});
});

//Create(GET) New Form & Submit(Post) New Form:
//Ensure to REDIRECT in the POST to not resubmit the form!
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username, comment});
    res.redirect('/comments');
});





//!Start Listening on the giving port!
app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
});