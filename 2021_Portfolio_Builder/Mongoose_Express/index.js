/**
 * 
 ** "Putting It All Together" 
 * 
 * 
 ** Basic Setup in Section 38 vid 396 for reference + method-override & middleware
 *
 ** Add CRUD (connects all database/webserver/templating options)
 *
 *
 */
//! Setup - Start
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');
const methodOverride = require('method-override');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
}
main()
    .then(() => console.log("Connected To Mongo"))
    .catch(err => console.log("Connection Error", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//! Setup - End


//?Routes:
//! Note: Data From the Product Model & DB (req from mongoose asynchronously OR then/catch)
//* async and await:
//* INDEX
//! Add Query String for filtering in the INDEX Route
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