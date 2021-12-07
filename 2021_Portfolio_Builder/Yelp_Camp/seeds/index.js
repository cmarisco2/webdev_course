//? Connects directly to db when run.
//? Seeds the campground data from cities.js and seedHelper.js

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelper');

//* Connection Boilerplate w/ yelp-camp as the end-point
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
main()
    .then(() => console.log('connected to Yelp-Camp DB'))
    .catch(err => console.log(err));
//* End of boilerplate

//* Deletes all in db, then loops to add random city-state combos, and custom array sample function to pick a random element from any array
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        await new Campground({
            title: `${arraySampler(descriptors)}, ${arraySampler(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`
        }).save();
    }

}

//*Returns Random element of an array -> Math.random() * array.length, floored, as the index
const arraySampler = (array) => array[Math.floor(Math.random() * array.length)];


//?Runs seeding, then closes the connection.
seedDB()
    .then(() => {
        mongoose.connection.close();
    });