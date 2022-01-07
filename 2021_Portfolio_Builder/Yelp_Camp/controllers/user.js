const User = require('../models/user');

//* Create New User: 1) GET FORM 2) POST FORM
module.exports.registrationForm = (req, res) => {
    res.render('users/register');
}
module.exports.createUser = async(req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        //* logs in after register. Need callback to handle error (no await supported).
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success' ,'Welcome To Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

//* Login as an already registered user:
module.exports.loginForm = (req, res) => {
    res.render('users/login');
}
//! Passport Middleware to login -> passport.authenticate() [done in user route]
module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back!');
    //* Shorts to session info, if there, else to default.
    const redirectedUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectedUrl);
}

//* Logout Route: use req.logout() then redirect
module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out -> See You Next Time');
    res.redirect('/campgrounds');
}