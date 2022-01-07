/**
 ** Move Reviews Routes, dependencies, and middleware funtions from index.js to this file 
 */
 const express = require('express');
 const router = express.Router({mergeParams: true}); //! Need Merge Params to ref {id} from the full route when it's not on the router's params in this file

 const catchAsync = require('../utilities/catchAsync');
 const ExpressError = require('../utilities/ExpressError');
 const Campground = require('../models/campground');
 const Review = require('../models/review');
 const reviews = require('../controllers/reviews');
 const { validateReview, isLoggedIn, isAuthorReview } = require('../middleware');
 //? Reviews Routes:
//* Post Review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.postReview));

//* Delete Review
router.delete('/:reviewId', isLoggedIn, isAuthorReview, catchAsync(reviews.deleteReview));

module.exports = router;