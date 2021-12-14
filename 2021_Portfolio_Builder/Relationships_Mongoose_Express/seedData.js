/**
 ** Stand Alone File - Seeding The Database
 *
 ** Run Once To Put Dummy Data In
 ** No Need to Connect to a Web Server 
 */

const mongoose = require('mongoose');
const Product = require('./models/product');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
}
main()
    .then(() => console.log("Connected To Mongo"))
    .catch(err => console.log("Connection Error", err));

const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})

//* Commented out to not save twice when run again.
// p.save()
//     .then(p => console.log(p))
//     .catch(e => console.log(e));

const products = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
];

Product.insertMany(products)
    .then(res => console.log(res))
    .catch(err => console.log(err));