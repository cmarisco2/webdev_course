const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const { findByIdAndUpdate } = require('./models/campground');

//*Sets Up Mongoose Connection
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
main()
    .then(() => console.log('connected to Yelp-Camp Database on MongoDB'))
    .catch(err => console.log(err));
//*End of Mongoose Connection Setup.

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//?ROUTES:
app.get('/', (req, res) => {
    res.render('home');
});

//*INDEX
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});


//*CREATE
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});
app.post('/campgrounds', async (req, res) => {
    //?Need to use middleware to know how to parse 'req.body'
    //?Note: req.body.campground is an object => constructor doesn't require '{}'
    //*We Know that campground is posted in the body from 'new' form
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

//*SHOW
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
});

//*EDIT
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
});
app.put('/campgrounds/:id', async (req, res) => {
    //INCORRECT -> Need to update NOT CREATE
    // const campground = new Campground(req.body.campground);
    // await campground.save();
    //?Get id from params. new data in the req.body. use spread operator to send as 2nd arg to findByIdAndUpdate
    const campground = await Campground.findByIdAndUpdate(req.params.id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

//*DELETE -> sent via form w/button, overrided method, on existing form page (like SHOW)
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

//*Sets Up Listening Port For Web App
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});