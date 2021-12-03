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
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        min: [0, 'Price Must Not Be Negative'] //* Provides Value and Message if in error
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'], //* Provides a set of valid values for the above type
        default: 'L'
    }
});

//? Instance Methods ---> Means the method refers to the instance using it (not the class)
//? -added to the schema, called from a particular instance, uses 'this' to refer to the instance source
//? -use function assignment with normal definition for proper 'this' prediction(left of the .greet calling it).
productSchema.methods.greet = function (){
    console.log("Hello");
    console.log(`-from ${this.name}`);  //works with the class/product's name at the time.
}

// ! instance via 'methods'
productSchema.methods.toggleOnSale = function(){
    this.onSale = ! this.onSale;
    return this.save();
}
// ! static via 'statics' (this context changes)
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0});
}

//Finish defining schema before associating it with the class name
const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: 'Moutain Bike', price: 599});
// bike.save()
//     .then(data => console.log("It Worked", data))
//     .catch(err => console.log("Something Went Wrong", err));

const ride = new Product({name: 'Scooter', price: 200});
// ride.save()
//     .then(data => console.log("Scoot!", data))
//     .catch(err => console.log("Something err'd ", err));

//! Note: Validations Only apply to creation and saving. Updating can break validation constraints
//! ---ex: price: -100 (min is set to 0)
//! NEED SET OPTION runValidators: true 
//! --ex: {new: true, runValidators: true} 
//* Product.findOneAndUpdate({name: 'Scooter'}, {$set: {price: 200}}, {new: true, runValidators: true})
//*     .then(data => {
//*        console.log("it works", data);
//*     })
//*     .catch(err => {
//*         console.log("It didn't work", err);
//*     })

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Scooter'});
    foundProduct.toggleOnSale();
}
// findProduct();

Product.fireSale()
    .then(res => console.log("Success", res))
    .catch(err => console.log("Error: ", err));

Product.find({}).then(data => console.log(data));


