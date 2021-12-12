/**
 * 
 ** Use Wrapper Function on Async Functions to handle errors
 *
 *! All Async Error Handling Replaced with Utility function in this app
 */


/**
 *? IDEA:
 *
 *? -Pass fn as arg
 *? -Return new function definition -> calls arg fn w/ its desired args in its body
 *? -Append the catch framework wanted for error handling
 *
 ** function WrapAsync(fn){
 **    return function(req, res, next){
 **      fn(req, res, next).catch(e => next(e))
 **    }
 ** }
 *  
 */


//* Setup - Start
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const methodOverride = require('method-override');
const AppError = require('./AppError');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand2');
}
main()
    .then(() => console.log("Connected To Mongo"))
    .catch(err => console.log("Connection Error", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//* Setup - End

//!Function Wrapper for Async Errors!:
//?NOTE: THIS IS A GREAT EXAMPLE OF MUTATING A FUNCTION AND HANDING IT BACK
//* Layer 1 has fn as arg
const wrapAsync = function(fn) {
    //* Layer 2 has the fn's args...as args (returned w/ anonymous function)
    return function(req, res, next){
        //* Layer 3 calls the fn arg, with the passed args, in body + catch/handlers
        fn(req, res, next).catch(e => next(e));
    }
}

//?Routes:

//* HOME
app.get('/', (req, res) => {
    res.send("Products Home Page");
});
//* INDEX w/ ASYNC UTILITY (FUNCTION WRAPPER TO ADD ASYNC ERROR HANDLING!)
//? Errors Handled via wrapAsync(fn) -> fn().catch(e => next(e))
app.get('/products', wrapAsync(async (req, res, next) => {
    const{ category } = req.query;
    //*array of product objects from DB
    category == null ? products = await Product.find({}) : products = await Product.find({category})
    res.render('products/index', { products });
}));

//* CREATE: 
app.get('/products/new', (req, res) => {
    res.render('products/new');
});
//? Errors Handled via wrapAsync(fn) -> fn().catch(e => next(e))
app.post('/products', wrapAsync(async (req, res, next) => {
    const {name, price, fruit, category} = req.body;
    const newProduct = new Product({name, price, fruit, category});
    await newProduct.save();
    res.redirect('/products');
}));

//* SHOW/DETAILS
//? Errors Handled via wrapAsync(fn) -> fn().catch(e => next(e))
app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if(!foundProduct){ 
        return next(new AppError(500, "Product Not Found")); //!RETURN Stops the res.render from attempting to run
    }
    res.render('products/show', {foundProduct});
}));

//* UPDATE:
//? Errors Handled via wrapAsync(fn) -> fn().catch(e => next(e))
app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if(!foundProduct){
        return next(new AppError(500, "No Such Product Found"));
    }
    res.render('products/edit', {foundProduct});
}));
app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${foundProduct._id}`);
}));

//* DELETE: -add 'form' to SHOW page and override its action. delete from db and redirect
//? Errors Handled via wrapAsync(fn) -> fn().catch(e => next(e))
app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
}));

app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
})

//? All Purpose Error Handler
app.use((err, req, res, next) => {
    const{status = 500, message = "Something Went Wrong"} = err;
    res.status(status).send(message);
})

//? Listening
app.listen(3000, () => {
    console.log("App is Listening on Port 3000");
});