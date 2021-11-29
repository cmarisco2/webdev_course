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
 ** Update Single Comment: 'Patch'
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
const { v4:uuid } = require('uuid');
//! Allows overriding and HTTP Method on a form
const methodOverride = require('method-override');


app.use(express.urlencoded({extended: true}));
//! Allows overriding and HTTP Method on a form
//! Add as a query string to the end of the action address of the form (Patch Route)
//! --ex: action=":patchAddres?_method=PATCH" method ="POST"
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//! Array of Objects as a pseudo database of comments.
const comments = [
    {
        id: uuid(),
        username: 'Eren Jaegar',
        comment: 'I just want to be free' 
    },
    {
        id: uuid(),
        username: 'Booker DeWitt',
        comment: 'Give us the girl, and wipe away the debt'
    },
    {
        id: uuid(),
        username: 'Sans',
        comment: 'LoloLolOloL'
    },
    {
        id: uuid(), 
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


//Create(GET) New Form & Submit(Post) New Form:
//Ensure to REDIRECT in the POST to not resubmit the form!

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
});

// Update a comment -> Patch Request
// * Patch vs Put: Patch (updates what's there) Put (replaces the whole thing)
// ? NEED to Modify Form (obtained via Get request) to handle a Patch Method
// ? Pre-populate the form via finding the comment and rendering it in the form.
//!Need to install method-override package for express to patch via html form.
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment; //* 'comment' can be simulated via Postman.
    const commentObject = comments.find( c => c.id === id);
    commentObject.comment = newComment;
    res.redirect('/comments');

});
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const commentObject = comments.find( c => c.id === id);
    const { username, comment } = commentObject;
    res.render('comments/edit', {comment, username, id});
});

//!Make sure pattern matching addresses are put AFTER explicit ones!
//! -ex: /comments/new will not be reached, unless it's BEFORE /comments/:id
// Show Single Comment
// 1 - retrieve comment from params id
// 2 - render ejs page with the comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentObject = comments.find( c => c.id === id);
    const {username, comment} = commentObject;
    res.render('comments/show', {username, comment, id});
});





//!Start Listening on the giving port!
app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
});