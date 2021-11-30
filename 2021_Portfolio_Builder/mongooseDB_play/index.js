// Mongoose Setup and Demo
const mongoose = require('mongoose');

// New way to connect. Uses async for connection definition. call() and catch 
async function main() {
    await mongoose.connect('mongodb://localhost:27017/movieApp');
}

main()
    .then(() => console.log("Connection Open"))
    .catch(err => console.log(err));

// Schema Definition in JS 
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
// Creates the Class
// Takes String 'Movie' and makdes the collection 'movies' (lower case then plural the string)  
const Movie = mongoose.model('Movie', movieSchema);


//! CRUD - CREATE
const pokemon = new Movie({title: 'Pokemon Movie 2000', year: 2000, score: 9000, rating: 'NC-17'});

//? Needed to Save to DB. Note ONLY one instance. What about adding multiple?
//returns promise
//* pokemon.save();

// Note: 'save' not needed since inserting many is explicitly called. needed above to save class object created.
//* Movie.insertMany([
//*     {title: 'Cowboy Bebop', year: 2001, score: 9.8, rating: 'R'}, 
//*     {title: 'The Last Dance', year: 2021, score: 10, rating: 'PG-13'},
//*     {title: 'Oscar in Wonderland', year: 2050, score: 1.0, rating: 'G'}
//* ])
//*     .then((data) => {
//*         console.log("It worked", data);
//*     })

//! CRUD - READ (Finding) 