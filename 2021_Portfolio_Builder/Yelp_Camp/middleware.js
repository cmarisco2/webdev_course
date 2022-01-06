const Campground = require('./models/campground');
const Review = require('./models/review');
const ExpressError = require('./utilities/ExpressError');
const { campgroundSchema, reviewSchema } = require('./validationSchemas/schemas');

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

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        const { id } = req.params;
        req.session.returnTo = (!req.query._method ? req.originalUrl : `/campgrounds/${id}`)
        req.flash('error', 'Must Be Logged In To Perform This Action');
        return res.redirect('/login');
    }
    next();
}

//* Middleware for checking if user == author for Permissions
//* 1 -> Find. 2 -> check permissions (user == author). 3 -> update/redirect
const isAuthorCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'This Action Is Permitted Only By The Campgrounds Author');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

//* Middleware for checking valid author of review prior to deleting:
const isAuthorReview = async (req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'This Action is Permitted Only By the Review Author');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

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

module.exports.isLoggedIn = isLoggedIn;
module.exports.isAuthorCampground = isAuthorCampground;
module.exports.isAuthorReview = isAuthorReview;
module.exports.validateCampground = validateCampground;
module.exports.validateReview = validateReview;