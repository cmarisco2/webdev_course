/**
 ** Using Schema Validations and Constrains
 *
 * 
 */


const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}

main()
    .then(() => console.log("Connection Open"))
    .catch(err => console.log(err => console.log("Error Occured", err)));

//? Assign each key to an object 
//! ---ex: name: {type: String, required: true} => New Way with more Validations/Data Constraints
//? Add Validations and requirements as fields of the object.
//? Normally, type is assumed without object 
//! ---ex: name: String => Old Way with just type assumed as the Value only.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: 'Moutain Bike', price: 599});
bike.save()
    .then(data => console.log("It Worked", data))
    .catch(err => console.log("Something Went Wrong", err));
