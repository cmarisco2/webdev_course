/**
 * User Routes
 * username: carl password: carl for debugging purposes
 */
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const passport = require('passport');
const User = require('../models/user');


//* Create New User: 1) GET FORM 2) POST FORM
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    try {

        const { username, email, password } = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success' ,'Welcome To Yelp Camp!');
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

//* Login as an already registered user:
router.get('/login', (req, res) => {
    res.render('users/login');
});

//! Passport Middleware to login -> passport.authenticate()
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,(req, res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect('/campgrounds');
});




module.exports = router;