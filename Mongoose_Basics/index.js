const mongoose = require('mongoose');
// creates movieApp if it doesn't already exist.
// connects to the port mongodb is on.
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected!!!!');
    })
    .catch(err => {
        console.log('an error has occured');
        console.log(err);
    });

// Class -> Schema
// Model Creation -> uses Schema
// movies collection created.
// movie model created.
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
const Movie = mongoose.model('Movie', movieSchema);

// single model instance
const ninjaTurtle = new Movie({ title: 'Ninja Turtles', year: 1990, score: 85, rating: 'PG' });
// ninjaTurtle.save();


// Insert Many into MongoDB
// Use Model class not an individual instance.
// Returns Promise (no saving needed)

// Commented out to not re-run entry:

// Movie.insertMany([
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
//     { title: 'Toy Story', year: 1995, score: 8.9, rating: 'G' },
//     { title: 'Avengers', year: 2012, score: 7.8, rating: 'PG-13' }
// ])
//     .then(data => {
//         console.log('Multiple Data Entries inserted');
//         console.log(data);
//     })
//     .catch(e => {
//         console.log('Unexpected Error:');
//         console.log(e);
//     });