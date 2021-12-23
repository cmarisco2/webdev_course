/**
 ** Move Reviews Routes, dependencies, and middleware funtions from index.js to this file 
 */
 const express = require('express');
 const router = express.Router({mergeParams: true}); //! Need Merge Params to ref {id} from the full route when it's not on the router's params in this file

 const catchAsync = require('../utilities/catchAsync');
 const ExpressError = require('../utilities/ExpressError');
 const Campground = require('../models/campground');
 const Review = require('../models/review');
 const { reviewSchema } = require('../validationSchemas/schemas');

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

 //? Reviews Routes:

 //* CREATE 1) "GET" route is actually just Show/Details of a Campround w/ Form
//* CREATE 2) POST is needed -> campgrounds/:id/reviews
//* --Find Campground by ID
//* --Find Review from Form Body (create new Review Object)
//* --PUSH new Review onto campground's reviews property array
//* --SAVE BOTH Models -> Redirect

router.post('/', validateReview, catchAsync(async (req, res) => {
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
router.delete('/:reviewId', catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;