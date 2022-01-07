/**
 ** Controller - Reviews
 * 
 * Meant For Moving Logic from the router/reviews for more modular approach.
 * Enables the MVC Design Pattern 
 */

 const Campgroud = require('../models/campground');
 const Review = require('../models/review');

 //?Review - Post Review Route Logic
//* CREATE 1) "GET" route is actually just Show/Details of a Campround w/ Form
//* CREATE 2) POST is needed -> campgrounds/:id/reviews
//* --Find Campground by ID
//* --Find Review from Form Body (create new Review Object)
//* --PUSH new Review onto campground's reviews property array
//* --SAVE BOTH Models -> Redirect
module.exports.postReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campgroud.findById(id);
    const { review } = req.body;
    const nextReview = new Review(review);
    nextReview.author = req.user._id;
    campground.reviews.push(nextReview);
    await nextReview.save();
    await campground.save();
    req.flash('success', 'Successfully Submitted Review');
    res.redirect(`/campgrounds/${campground._id}`)
}

//? Review - Delete Review Route Logic
//* DELETE Review & Remove it from the Associated Campground
//* Note: {$pull: {collection: item}} is taking the item out of the collection.
module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Campgroud.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully Deleted Review');
    res.redirect(`/campgrounds/${id}`);
}