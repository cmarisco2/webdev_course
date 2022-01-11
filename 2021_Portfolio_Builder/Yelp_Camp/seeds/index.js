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
    for(let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        await new Campground({
            title: `${arraySampler(descriptors)}, ${arraySampler(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            images: [
                {
                    url : "https://res.cloudinary.com/dmlzjpicq/image/upload/v1641785257/YelpCamp/qdgsj2scljua2l3q65g1.jpg",
                
                    filename : "YelpCamp/qdgsj2scljua2l3q65g1"
                },

                { 
                    url : "https://res.cloudinary.com/dmlzjpicq/image/upload/v1641785258/YelpCamp/vmopr9tj1wdyyem2c7dq.jpg", 
                
                    filename : "YelpCamp/vmopr9tj1wdyyem2c7dq"
                },
                
                {
                    url : "https://res.cloudinary.com/dmlzjpicq/image/upload/v1641785258/YelpCamp/gk02xrdhjarkw9tjt9od.jpg", 
                
                    filename : "YelpCamp/gk02xrdhjarkw9tjt9od"
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


//?Runs seeding, then closes the connection.
seedDB()
    .then(() => {
        mongoose.connection.close();
    });