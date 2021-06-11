// Setup Mongoose:
const mongoose = require('mongoose');
const Product = require('./models/product');
// Setup Models Required:
const product = require('./models/product');
// Setup MongoDB connection
mongoose.connect('mongodb://localhost:27017/FarmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB Connected!');
    })
    .catch(err => {
        console.log('Mongo Error Detected:');
        console.log(err);
    });

// Inserting Seed data for single item:

const p = new Product({
    name: 'tangerine',
    price: .79,
    category: 'fruit'
});

// p.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// Inserting Seed data for many at once:

const seedProducts = [
    {
        name: 'Egg Plant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'organic melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Coconut',
        price: 3.00,
        category: 'fruit'
    },
    {
        name: 'Milk',
        price: 2.50,
        category: 'dairy'
    },
    {
        name: 'Chicken Tendies',
        price: 1000,
        category: 'meat'
    }
];

// Product.insertMany(seedProducts)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));