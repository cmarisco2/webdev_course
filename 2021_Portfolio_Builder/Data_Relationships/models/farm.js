/**
 ** Demo: 1 --> Many Relationship in MongoDB
 ** --store ObjectID (refs) to the child in an array/collection
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}
main()
    .then(() => console.log("Connected To MongDB"))
    .catch(err => console.log(err));



//* 1 - Make an "INNER" schema to be used in the many relationship later
//* --i.e. products will be in a collection (farm)
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

//* 1 - Make an "OUTTER" schema
//* 2 - Add references to the inner in the collection ('Populate' on Docs)
const farmSchema = new Schema({
    name: String,
    city: String,
    //* Array of ProductIDs
    products: [{type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Farm = mongoose.model('Farm', farmSchema);
const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Spring'},
//     {name: 'Watermelon', price: 2.99, season: 'Summer'},
//     {name: 'Carrots', price: 0.99, season: 'Fall'}
// ]).then(() => {
//     mongoose.connection.close();
// });

//* Create New Farm. Find Product and Link to New Farm
const makeFarm = async () => {
    const farm = new Farm({name: 'Full Belly Farms', city: 'San Mono, CO'});
    const carrots = await Product.findOne({name: 'Carrots'});
    farm.products.push(carrots);
    farm.save()
        .then(() => {
            mongoose.connection.close();
        });
}

//? makeFarm(); //saving to db

//* Find Product and Link to existing Farm
const addProduct = async () => {
    const farm = await Farm.findOne({name: 'Full Belly Farms'});
    const watermelon = await Product.findOne({name: 'Watermelon'});
    farm.products.push(watermelon);
    farm.save()
        .then(() => {
            mongoose.connection.close();
        });
}

//? addProduct(); //save to db

//* View Nested Data --> "Populate":
Farm.findOne({name: 'Full Belly Farms'})
    //* Note: name of 'field' used. Not the ref itself.
    .populate('products') //! without this portion -> displays [ObjectIDs], now [Product]
    .then(farm => console.log(farm));