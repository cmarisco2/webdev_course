/**
 * User Routes
 * username: carl password: carl for debugging purposes
 * id: 61d34d89d0ac50a867b657c2
 */
const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const passport = require('passport');
const User = require('../models/user');
const user = require('../controllers/user');


//* Create New User: 1) GET FORM 2) POST FORM
router.get('/register', user.registrationForm);
router.post('/register', catchAsync(user.createUser));

//* Login as an already registered user:
router.get('/login', user.loginForm);

//! Passport Middleware to login -> passport.authenticate()
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) , user.loginUser);

//* Logout Route: use req.logout() then redirect
router.get('/logout', user.logoutUser);


module.exports = router;