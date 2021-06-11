// Creation of the mongoDB model "Product"
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy', 'poultry', 'meat'],
        lowercase: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;