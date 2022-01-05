const Campground = require('./models/campground');
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
        req.session.returnTo = req.originalUrl;
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
module.exports.validateCampground = validateCampground;
module.exports.validateReview = validateReview;