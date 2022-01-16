//? Connects directly to db when run.
//? Seeds the campground data from cities.js and seedHelper.js

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const photos = require('./photos');
const { descriptors, places } = require('./seedHelper');
//* Production vs Local
// const db_url = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
const db_url = process.env.DB_URL;

//* Connection Boilerplate w/ yelp-camp as the end-point
async function main() {
    await mongoose.connect(db_url);
}
main()
    .then(() => console.log('connected to Yelp-Camp DB'))
    .catch(err => console.log(err));
//* End of boilerplate

//* Deletes all in db, then loops to add random city-state combos, and custom array sample function to pick a random element from any array
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        const imageUrl1 = arraySelector(photos, 41);
        const filename1 = imageUrl1.slice(62, 91);
        await new Campground({
            title: `${arraySampler(descriptors)}, ${arraySampler(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            images: [
                { 
                    url: imageUrl1, 
                
                    filename: filename1
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                     cities[rand1000].latitude
                    ] // [lng, lat]
            },
            // USER ID FOR CARL in mongoDB
            author: '61d34d89d0ac50a867b657c2',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum officia perspiciatis natus dolore animi magnam maiores dolorem sunt similique, quaerat quasi architecto reiciendis explicabo tenetur laborum pariatur! Ea, laborum quod.',
            price
        }).save();
    }

}

//*Returns Random element of an array -> Math.random() * array.length, floored, as the index
const arraySampler = (array) => array[Math.floor(Math.random() * array.length)];
//*Sampler with a prime modulus
const arraySelector = (array, prime) => array[Math.floor(Math.random() * array.length) % prime];


//?Runs seeding, then closes the connection.
seedDB()
    .then(() => {
        mongoose.connection.close();
    });