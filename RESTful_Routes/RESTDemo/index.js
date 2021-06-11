const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidV4 } = require('uuid');
const methodOverride = require('method-override');

let comments = [
    {
        username: "Rush",
        text: 'lol, bruh. That is hilarious',
        id: uuidV4()
    },
    {
        username: 'Reese',
        text: 'Amazing Film',
        id: uuidV4()
    },
    {
        username: 'Ray',
        text: 'Promised Neverland is about me',
        id: uuidV4()
    },
    {
        username: 'Roger',
        text: 'Who framed me?',
        id: uuidV4()
    }
];


// assign the view engine -> to ejs
app.set('view engine', 'ejs');
// assign the views path to 'this' path /views
app.set('views', path.join(__dirname, 'views'));

// middleware for accepting json and urlencoded inputs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware for overriding form methods.
app.use(methodOverride('_method'));

// CRUD implementation of READING every comment.
// READ ALL COMMENTS.
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments });
});

// CRUD implementation for creating a new comment.
// 2 Step process. 
// Create/render the form to  use via get request.
// Then post to '/comments'
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
});
app.post('/comments', (req, res) => {
    const { username, comment: text } = req.body;
    comments.push({ username, text, id: uuidV4() });
    // res.send('Comment Added, Successfully');
    // res.render('comments/index.ejs', { comments });
    res.redirect('/comments');
});

// Show comment
// uses individual comment 'id'
// '/comments/:id' 
// accessible via the params in request object.
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { username, text } = comments.find(x => x.id === id);
    // res.send(text);
    res.render('comments/show.ejs', { text, username, id });
});

// getting a form to edit comments

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);

    res.render('comments/edit.ejs', { comment });
});

// Making updates to existing comments.
app.patch('/comments/:id', (req, res) => {
    // res.send('Patch is working');
    const { id } = req.params;
    const newText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.text = newText;
    res.redirect('/comments');
});

// DELETE
// Uses similar method override principles
// return a filtered object without the selected comment.
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

// Typical get response. '/tacos' is appended to the listening source -> localhost:3000
app.get('/tacos', (req, res) => {
    res.send('GET response to tacos');
});

// Post response. 
app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Here is your ${qty} ${meat}`);
});

app.listen('3000', () => {
    console.log('Listening on Port 3000');
});