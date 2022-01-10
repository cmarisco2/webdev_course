/**
 ** Move Campground Routes, dependencies, and middleware funtions from index.js to this file 
 */
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthorCampground, validateCampground } = require('../middleware');
//* Campground Controller
const campgrounds = require('../controllers/campgrounds');

//* Setup Multer for uploading docs
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage }); 

//* Helper Function For Throwing Flashes upon Null Campground Errors
const notFoundCampgroundFlash = (req, res) => {
    req.flash('error', 'Campground Cannot Be Found');
    // return needed to prevent further execution
    return res.redirect('/campgrounds');
}


//? Campgroud Routes:
//* '/' routes
router.route('/')
    .get(catchAsync(campgrounds.index)) //* Index
    //* req.file -> upload.singe() req.files -> upload.array()
   .post(isLoggedIn, upload.array('campground[images]'), validateCampground,  catchAsync(campgrounds.createCampground)) //* multer middleware demo to create campground image upload
    
//* CREATE Form
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//* '/:id' routes
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) //* Show
    .put(isLoggedIn, isAuthorCampground, upload.array('campground[images]'), validateCampground, catchAsync(campgrounds.editCampground)) //* Put Edits
    .delete(isLoggedIn, isAuthorCampground, catchAsync(campgrounds.deleteCampground)) //* Delete -> sent via form w/button, override method, on existing form page

//* EDIT Form
// Get Form
router.get('/:id/edit', isLoggedIn, isAuthorCampground, catchAsync(campgrounds.renderEditForm));

module.exports = router;