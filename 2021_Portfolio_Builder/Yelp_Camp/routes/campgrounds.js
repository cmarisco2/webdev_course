/**
 ** Move Campground Routes, dependencies, and middleware funtions from index.js to this file 
 */
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../validationSchemas/schemas');
const { isLoggedIn, isAuthorCampground, validateCampground } = require('../middleware');
//* Campground Controller
const campgrounds = require('../controllers/campgrounds');


//* Helper Function For Throwing Flashes upon Null Campground Errors
const notFoundCampgroundFlash = (req, res) => {
    req.flash('error', 'Campground Cannot Be Found');
    // return needed to prevent further execution
    return res.redirect('/campgrounds');
}


//? Campgroud Routes:
//* INDEX
router.get('/', catchAsync(campgrounds.index));


//* CREATE
//! Add Authentication Check via middleware
router.get('/new', isLoggedIn, campgrounds.renderNewForm);
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

//* SHOW
router.get('/:id', catchAsync(campgrounds.showCampground));

//* EDIT
// Get Form
router.get('/:id/edit', isLoggedIn, isAuthorCampground, catchAsync(campgrounds.renderEditForm));
// Put Edits
router.put('/:id', isLoggedIn, isAuthorCampground, validateCampground, catchAsync(campgrounds.editCampground));

//* DELETE -> sent via form w/button, overrided method, on existing form page (like SHOW)
router.delete('/:id', isLoggedIn, isAuthorCampground, catchAsync(campgrounds.deleteCampground));

module.exports = router;