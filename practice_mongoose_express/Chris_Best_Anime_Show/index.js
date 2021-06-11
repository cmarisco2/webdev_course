// Setup Express:
const express = require('express');
const app = express();
// Get Path for universal execution
const path = require('path');
// Required for adding additional methods to form submissions.
const methodOverride = require('method-override');
// Require Model:
const Anime = require('./models/anime');

// Setup Mongoose & MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AnimeApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log('Oh no, an error has occured:');
        console.log(error);
    });



// Set Middle Ware:
// Views engine:
app.set('view engine', 'ejs');
// Set views directory:
app.set('views', path.join(__dirname, 'views'));
// Set body parsers:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set method override for forms:
app.use(methodOverride('_method'));

// Home Page Test
app.get('/', (req, res) => {
    res.render('anime/home');
});

// CRUD OPERATIONS:

// READ ALL:
// Use async request to get all the shows from the db.
// render the data on an ejs view (in the views folder).
app.get('/shows', async (req, res) => {
    const shows = await Anime.find({});
    res.render('anime/shows', { shows });
});

// CREATE A SHOW: (REQUIRED ABOVE READONE B/C URL CONFLICT)
// Uses 2 Routes and a Form:
// Route 1 is a regular synchronous get request for a form (new.ejs).
// Route 2 is Post Request. Async because needs to save to DB.
app.get('/shows/new', (req, res) => {
    res.render('anime/new');
});
app.post('/shows', async (req, res) => {
    const newAnime = new Anime(req.body);
    await newAnime.save();
    res.redirect(`/shows/${newAnime._id}`);
});

// READ ONE:
// Async request to DB for the details of a single show.
// Object _id is used as the identifier.
// found in the params.
app.get('/shows/:id', async (req, res) => {
    const { id } = req.params;
    const foundShow = await Anime.findById(id);
    res.render('anime/details', { foundShow });
});

// UPDATE:
// 2 Async Routes, A Method Override and a Form.
// Route 1: GET request for a form. Uses id of item to find it via db query and fill the update form.
// Route 2: PUT request. Uses id from params and findByIdAndUpdate method. Redirects to updated show.
// Form: similar to a new form except for the query string to override the POST method and existing values shown via EJS
app.get('/shows/:id/update', async (req, res) => {
    const { id } = req.params;
    const foundShow = await Anime.findById(id);
    res.render('anime/update', { foundShow });

});
app.put('/shows/:id', async (req, res) => {
    const { id } = req.params;
    await Anime.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/shows/${id}`);
});


// Setup Express to Listen 
app.listen('3000', () => {
    console.log('Connected and Listening on Port 3000');
});