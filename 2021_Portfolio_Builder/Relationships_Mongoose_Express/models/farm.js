/**
 *? Displays Relationship with 2 Schemas in an app 
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./product');

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm Must Have A Name']
    },

    city: {
        type: String,
    },

    email: {
        type: String,
        required: [true, 'A Valid Email is Required']
    },

    products : [{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    }]
});

//! Middleware for deleting farm w/ linked data

//* farmSchema.pre('findOneAndDelete', async function(){
    //? happens prior and does not contain properties
//* });

farmSchema.post('findOneAndDelete', async function(farm) {
    //if products exist on the deleted farm
    if(farm.products.length){
        //? Use 'Product' Model and the '$in' operator
        await Product.deleteMany({_id: {$in: farm.products}})
    }
});
const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;