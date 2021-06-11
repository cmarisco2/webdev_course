// Express Setup.
const express = require('express');
const app = express();
const path = require('path');
// Require Method Override for Put/Patch routes:
const methodOverride = require('method-override');
// Require ejs engine for boilerplate code and setting it:
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
// require server-side schema:
const { campgroundSchema } = require('./schemas');
// Require Models:
const Campground = require('./models/campground');
// Mongoose&MongoDB Setup:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// require async wrapper to replace try and catch.
const catchAsync = require('./utilities/catchAsync');
// require custom error handling class.
const ExpressError = require('./utilities/ExpressError');
// Server-side validation for campgrounds data:
const validateCampgrounds = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error occurred'));
db.once('open', () => {
    console.log('Connected to Database!');
});

// Setup for view engine and view dir 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// NEED BODY PARSER FOR REQ!:
app.use(express.urlencoded({ extended: true }));

// NEED METHOD OVERRIDE FOR CRUD:
app.use(methodOverride('_method'));

// test of express connection
app.get('/', (req, res) => {
    res.render('home');
});

// local test of mongoDB connection
// app.get('/testDB', async (req, res) => {
//     res.send(await new Campground({ title: 'Play Pen', description: `Michael's Play Place` }).save());
// });

// CRUD: INDEX
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));

// CRUD: NEW and CREATE:
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});
app.post('/campgrounds', validateCampgrounds, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

}));


// CRUD: SHOW/DETAILS:
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}));

// CRUD: Edit & Update:
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));
app.put('/campgrounds/:id', validateCampgrounds, catchAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${req.params.id}`);
}));

// CRUD: DELETE:
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, an Unknown Error Has Occured."
    res.status(statusCode).render('error', { err });
});

// begin listening on local host port 3000
app.listen(3000, () => {
    console.log('listening on Port 3000');
});