/**
 * 
 ** Async Error Handling 
 *? Use 'try/catch + next' with error handling code at bottom.
 *? --also, can still throw errors within the try/catch if anticipated.
 ** --USE ON ALL ASYNC FUNCTIONS
 * 
 ** Duplicate Directory for testing
 ** Connect to "farmStand2" instead of farmStand
 */
//! Setup - Start
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
//! Setup - End


app.get('/', (req, res) => {
    res.send("Products Home Page");
})


//?Routes:
//! Note: Data From the Product Model & DB (req from mongoose asynchronously OR then/catch)
//* async and await:
//* INDEX
//! Add Query String for filtering in the INDEX Route
app.get('/products', async (req, res, next) => {
    try {
        const{ category } = req.query;
        //*array of product objects from DB
        category == null ? products = await Product.find({}) : products = await Product.find({category})
        res.render('products/index', { products });
    } catch(err){
        next(err);
    }
});

//* CREATE: 1) GET FORM 2) POST FORM (NEED TO USE PARSE MIDDLEWARE FOR POSTING)
app.get('/products/new', (req, res) => {
    res.render('products/new');
});
//! Validation Error Handling: ex --submitting an empty form.
//* use try/catch
//* pass error to next()
//? Handles the Mongoose Errors via try/catch
app.post('/products', async (req, res, next) => {
    try {
        const {name, price, fruit, category} = req.body;
        const newProduct = new Product({name, price, fruit, category});
        await newProduct.save();
        res.redirect('/products');
    } catch (err) {
        next(err);
    }
});


//! Async Error Handling: (comes from the docs)
//* NEED "next(err)" for async errors && next as a parameter for the route
//* Use conditional for the promise/thenable return.
//* SHOW/DETAILS
app.get('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);
        if(!foundProduct){
            return next(new AppError(500, "Product Not Found")); //!RETURN Stops the res.render from attempting to run
        }
        res.render('products/show', {foundProduct});
    } catch(err) {
        next(err);
    }
});

//* UPDATE: 1) GET FORM w/Data Filled Out 2) Change/PUTorPATCH/Redirect

app.get('/products/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);
        if(!foundProduct){
            return next(new AppError(500, "No Such Product Found"));
        }
        res.render('products/edit', {foundProduct});
    } catch(err) {
        next(err);
    }
});
app.put('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/products/${foundProduct._id}`);
    } catch(err) {
        next(err);
    }
});

//* DELETE: -add 'form' to SHOW page and override its action. delete from db and redirect
app.delete('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch(err) {
        next(err);
    }
});




//? All Purpose Error Handler
app.use((err, req, res, next) => {
    const{status = 500, message = "Something Went Wrong"} = err;
    res.status(status).send(message);
})

//? Listening
app.listen(3000, () => {
    console.log("App is Listening on Port 3000");
});