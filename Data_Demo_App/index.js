// Setup Express:
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidV4 } = require('uuid');
const methodOverride = require('method-override');
// Setup Mongoose:
const mongoose = require('mongoose');
// Setup Models Required:
const Product = require('./models/product');
const Farm = require('./models/farm');
// Setup MongoDB connection
mongoose.connect('mongodb://localhost:27017/FarmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB Connected!');
    })
    .catch(err => {
        console.log('Mongo Error Detected:');
        console.log(err);
    });

const categories = ['fruit', 'vegetable', 'dairy', 'poultry', 'meat'];

// Set Template Engine to EJS
app.set('view engine', 'ejs');

// Allow access to views dir if app is run outside local directory
app.set('views', path.join(__dirname, 'views'));
// Allow Express to host static files (runnable outside local dir)
app.use(express.static(path.join(__dirname, 'public')));
// Allow Express to parse URL-ENCODED and JSON from Req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Allows Express to override GET/POST method from FORMs
app.use(methodOverride('_method'));


// Test Express (run from the listening port):
app.get('/', (req, res) => {
    res.render('products/home');
});


// Farm Routes
// View All Farms:
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
});
// Create new farm:
app.get('/farms/new', (req, res) => {
    res.render('farms/new');
});
app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
});
// Show Route:
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
});

// New Product in Farms!
// Double Model updates with mutual references
app.get('/farms/:id/products/new', async (req, res) => {
    // const { id } = req.params;
    const farm = await Farm.findById(req.params.id);
    res.render('products/new', { categories, farm });
});
app.post('/farms/:id/products', async (req, res) => {
    // Find Or Create them:
    const { name, price, category } = req.body;
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const product = new Product({ name, price, category });
    // Link them:
    product.farm = farm;
    farm.products.push(product);
    // Save them:
    await product.save();
    await farm.save();
    // res.send(farm);
    res.redirect(`/farms/${id}`);
});
// Delet Farm and its associated Products (Model Schema Middleware)
app.delete('/farms/:id', async (req, res) => {
    await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
});
// Product Routes
// Products Index:
app.get('/products', async (req, res) => {
    const { category } = req.query;
    let products;
    if (category) {
        products = await Product.find({ category: category });
        res.render('products/index', { products, category });
    } else {

        products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
});

// Create New Product (2 Routes):
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

// Show individual product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', { foundProduct });
});

// Update:
// Need the id of the item (params)
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    // console.log(`products/${product._id}`);
    res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});





app.listen(3000, () => {
    console.log('Listening on localhost port: 3000');
});