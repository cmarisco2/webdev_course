const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');
const { findByIdAndUpdate } = require('./models/campground');
const ExpressError = require('./utilities/ExpressError');
const catchAsync = require('./utilities/catchAsync');
const { campgroundSchema, reviewSchema } = require('./validationSchemas/schemas');

const Review = require('./models/review');

//* Sets Up Mongoose Connection
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
main()
    .then(() => console.log('connected to Yelp-Camp Database on MongoDB'))
    .catch(err => console.log(err));
//* End of Mongoose Connection Setup.

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//* Middleware for validating campgrounds. Add as argument to desired routes. next()
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

//* Middleware for validating reviews.
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

//?ROUTES:
app.get('/', (req, res) => {
    res.render('home');
});

//* INDEX
app.get('/campgrounds', catchAsync(async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));


//* CREATE
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});
app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    //? Need to use middleware to know how to parse 'req.body'
    //? Note: req.body.campground is an object => constructor doesn't require '{}'
    //* We Know that campground is posted in the body from 'new' form

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

//* SHOW
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews'); //* Populate Reviews
    res.render('campgrounds/show', { campground });
}));

//* EDIT
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}));
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    //INCORRECT -> Need to update NOT CREATE
    // const campground = new Campground(req.body.campground);
    // await campground.save();
    //?Get id from params. new data in the req.body. use spread operator to send as 2nd arg to findByIdAndUpdate
    const campground = await Campground.findByIdAndUpdate(req.params.id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

//* DELETE -> sent via form w/button, overrided method, on existing form page (like SHOW)
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

//? Reviews Routes:
//* CREATE 1) "GET" route is actually just Show/Details of a Campround w/ Form
//* CREATE 2) POST is needed -> campgrounds/:id/reviews
//* --Find Campground by ID
//* --Find Review from Form Body (create new Review Object)
//* --PUSH new Review onto campground's reviews property array
//* --SAVE BOTH Models -> Redirect

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const { review } = req.body;
    const nextReview = new Review(review);
    campground.reviews.push(nextReview);
    await nextReview.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}));

//* DELETE Review & Remove it from the Associated Campground
//* Note: {$pull: {collection: item}} is taking the item out of the collection.
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));


//! Throws Error if not route has been hit yet -> Goes to Handler below
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
//? Error Handler:
//* 1 - app.all() for any routes that aren't anticipated
//* 2 - Custom Error Class --> throw in functions for specific cases we want to handle (i.e. empty query string or no req.body etc)
//* 3 - Try/Catch/Next OR --> mutate functions (Async Catching Errors Utility)
//* 4 - Catch-All Error Handler (see below: AFTER errors thrown to next(err))
//* ---use render() to utilize a ejs template
//* 5 - Joi (server-side validations of schema)
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = "Something Went Wrong";
    res.status(status).render('error', { err });
});

//* Sets Up Listening Port For Web App
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});