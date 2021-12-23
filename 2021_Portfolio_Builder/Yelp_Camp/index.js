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
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
//session use and middleware
const session = require('express-session');

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

//? session options
const sessionOptions = {
    secret: 'Hello_World',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7, //millisec in 1 week (Date.now() is in milliseconds)
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
//* Middleware
app.use(session(sessionOptions));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //* Serve Static Assets in public/ directory

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

//? Camprounds Router:
app.use('/campgrounds', campgroundRoutes);
//? Reviews Routes:
app.use('/campgrounds/:id/reviews', reviewRoutes); //* need merge params in reviews.js file in order to access campgrounds' "id" param for the review routes.

app.get('/', (req, res) => {
    res.render('home');
});




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