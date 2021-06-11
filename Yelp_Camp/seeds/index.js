// Require Models, Cities, and Helper:
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
// Mongoose&MongoDB Setup:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error occurred'));
db.once('open', () => {
    console.log('Connected to Database!');
});

// Seed Code:

// Helper function to return a random element from an array:
const randElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Async function to delete existing documents in MongoDB,
// and Create 50 new documents at random to seed the DB.
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randElement(descriptors)} ${randElement(places)}`,
            image: `https://source.unsplash.com/collection/483251/`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda exercitationem animi, quam sequi officia enim minima adipisci corrupti cumque debitis! Optio aspernatur quidem doloremque ratione, quas in nesciunt veritatis quam!`,
            price
        });
        await camp.save();
    }
}
// Seeding the DB.
seedDB()
    .then(() => {
        mongoose.connection.close();
    });