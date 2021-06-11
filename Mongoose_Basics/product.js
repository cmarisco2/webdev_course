const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/showApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Successful!!!');
    })
    .catch(err => {
        console.log('Oh no, an error has occured:');
        console.log(err);
    });


// Schema Constraints used
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },

    price: {
        type: Number,
        require: true,
        min: [0, 'Price must be greater than 0!']
    },

    onSale: {
        type: Boolean,
        default: false
    },

    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});
// Static Methods:
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
};
// Instance Methods:
productSchema.methods.greet = function () {
    console.log("Hello, I Love You!!!!");
    console.log(`-from ${this.name}`);
};
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
};
productSchema.methods.addCategory = function (newCategory) {
    this.categories.push(newCategory);
    return this.save();
};
const Product = mongoose.model('Product', productSchema);

// const helmet = new Product({
//     name: 'Wheel',
//     price: -5,
//     categories: ['Cycling']
// });

// helmet.save()
//     .then(data => {
//         console.log('Content Saved:');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error: Save Failed');
//         console.log(err);
//     });

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 5.50 }, { new: true, runValidators: true })
//     .then((data) => console.log(data))
//     .catch(err => console.log(err));

// Find and Greet:
const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Helmet' });
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);

}

// findProduct();
Product.fireSale()
    .then(res => console.log(res));

