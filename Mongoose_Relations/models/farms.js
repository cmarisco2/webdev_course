const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log('Connection to MongoDB Error has Occured');
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Summer', 'Winter', 'Spring', 'Fall']
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {
//         name: 'Goddess Melon',
//         price: 5.99,
//         season: 'Summer'
//     },
//     {
//         name: 'Asparagus',
//         price: 3.99,
//         season: 'Fall'
//     },
//     {
//         name: 'Broccoli',
//         price: 1.99,
//         season: 'Spring'
//     }
// ]);

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
    const farm = new Farm({
        name: 'Full Belly Farm',
        city: 'Denver, CO'
    });
    const broccoli = await Product.findOne({ name: 'Broccoli' });
    farm.products.push(broccoli);
    await farm.save();
    console.log(farm);
}

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farm' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

// addProduct();
Farm.findOne({ name: 'Full Belly Farm' })
    .populate('products')
    .then(farm => console.log(farm));