/**
 * 
 ** Data Relationships w/ Express App and MongoDB:
 ** Use: 1 : Few, 1 : Many, 1 : Bajillions, Many : Many as models
 * 
 * 
 *
 *
 */
//! Setup - Start
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const Farm = require('./models/farm');
const methodOverride = require('method-override');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmRelations');
}
main()
    .then(() => console.log("Connected To Mongo"))
    .catch(err => console.log("Connection Error", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//! Setup - End


//? Farm Routes:
//* Create Routes:
app.get('/farms/new', (req, res) => {
    res.render('farms/new');
});
app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
});

//! CREATE PROD on FARM
//! Associate product with a particular farm
//* Create Product...For a Farm
//* 1 - Get Form for Product --- From a Farm Page
//* 2 - Post to the new route /farms/:id/products (update the products form too!)
app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    //*Note: Uses the existing products new.ejs
    res.render('products/new', { id });
});
app.post('/farms/:id/products', async (req, res) => {
    //? Find Farm
    const { id } = req.params;
    const farm = await Farm.findById(id);
    //? Create Product
    const { name, price, category } = req.body;
    const product = new Product({name, price, category});
    //? Connect Them: push on the products[] and assign on the farm: property
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
});

//* INDEX Route:
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
});

//! Show Route w/ Nested Products!:
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
});

//! Deleting Linked Model Data: NEED MIDDLEWARE
//* USE MIDDLEWARE To FREE THE INNER MODEL DATA
app.delete('/farms/:id', async (req, res) => {
    //* findByIdAndDelete triggers findOneAndDelete's middleware
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})


//? Product Routes:
app.get('/products', async (req, res) => {
    const{ category } = req.query;
    //*array of product objects from DB
    category == null ? products = await Product.find({}) : products = await Product.find({category})
    res.render('products/index', { products });
});

//* CREATE: 1) GET FORM 2) POST FORM (NEED TO USE PARSE MIDDLEWARE FOR POSTING)
app.get('/products/new', (req, res) => {
    res.render('products/new');
});
app.post('/products', async (req, res) => {
    const {name, price, fruit, category} = req.body;
    const newProduct = new Product({name, price, fruit, category});
    await newProduct.save();
    res.redirect('/products');
});


//* SHOW/DETAILS
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show', {foundProduct});
});

//* UPDATE: 1) GET FORM w/Data Filled Out 2) Change/PUTorPATCH/Redirect

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/edit', {foundProduct});
});
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${foundProduct._id}`);
});

//* DELETE: -add 'form' to SHOW page and override its action. delete from db and redirect
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});






//? Listening
app.listen(3000, () => {
    console.log("App is Listening on Port 3000");
});