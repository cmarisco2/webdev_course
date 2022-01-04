/**
 ** Move Campground Routes, dependencies, and middleware funtions from index.js to this file 
 */
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../validationSchemas/schemas');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { isLoggedIn } = require('../middleware');

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

//* Helper Function For Throwing Flashes upon Null Campground Errors
const notFoundCampgroundFlash = (campground, req, res) => {
    req.flash('error', 'Campground Cannot Be Found');
    // return needed to prevent further execution
    return res.redirect('/campgrounds');
}


//? Campgroud Routes:
//* INDEX
router.get('/', catchAsync(async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));


//* CREATE
//! Add Authentication Check via middleware
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    //? Need to use middleware to know how to parse 'req.body'
    //? Note: req.body.campground is an object => constructor doesn't require '{}'
    //* We Know that campground is posted in the body from 'new' form
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully, created a new campground'); //* flash before a redirect. Update the template below as well. middleware will ensure variable exists
    res.redirect(`/campgrounds/${campground._id}`);
}));

//* SHOW
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author'); //* Populate Reviews
    if(!campground) return notFoundCampgroundFlash(campground, req, res);
    res.render('campgrounds/show', { campground });
}));

//* EDIT
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground) return notFoundCampgroundFlash(campground, req, res);
    res.render('campgrounds/edit', { campground });
}));
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    //INCORRECT -> Need to update NOT CREATE
    // const campground = new Campground(req.body.campground);
    // await campground.save();
    //?Get id from params. new data in the req.body. use spread operator to send as 2nd arg to findByIdAndUpdate
    const campground = await Campground.findByIdAndUpdate(req.params.id, {...req.body.campground});
    req.flash('success', 'Successfully Updated Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}));

//* DELETE -> sent via form w/button, overrided method, on existing form page (like SHOW)
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted Campground');
    res.redirect('/campgrounds');
}));

module.exports = router;