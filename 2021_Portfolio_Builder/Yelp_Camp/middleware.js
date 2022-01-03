const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'Must Be Logged In to Create New Campground');
        return res.redirect('/login');
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn;