//* Dev Environment Variable Setup
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError');

//* production vs local
// const db_url = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
const db_url = 'mongodb://localhost:27017/yelp-camp'
const secret = process.env.SECRET || 'Hello_World';

//* Security Middleware
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

//* Router 
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');

//* session & flash -> both have middleware functions
const session = require('express-session');
const flash = require('connect-flash');

//* mongo store
const MongoDBStore = require('connect-mongo')(session);

//* Passport Requirements
const passport = require('passport'); 
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//* Sets Up Mongoose Connection
//mongodb://localhost:27017/yelp-camp
async function main() {
    await mongoose.connect(db_url);
}
main()
    .then(() => console.log('connected to Yelp-Camp Database on MongoDB'))
    .catch(err => console.log(err));
//* End of Mongoose Connection Setup.

//* VIEW ENGINE SETTINGS
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//! SETUP OF MIDDLEWARE:

const store = new MongoDBStore({
    url: db_url,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', (e) => console.log("Session Store Erro",e));

//* SESSION OPTIONS:
const sessionOptions = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7, //millisec in 1 week (Date.now() is in milliseconds)
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};



//* Define middleware that calls req.flash()
//? 'success' = key. value defined in campgrounds.js
//* res.locals.success -> success property accessible for ejs views
//! Important: Renders Only If Exists (Add to template, if there render, if not, nothing)
//* res.locals 
const flashMessage = function (req, res, next) {
    res.locals.success = req.flash('success'); 
    res.locals.error = req.flash('error');
    next();
};

const currentSession = function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
}

//* Middleware via app.use():
app.use(session(sessionOptions));
app.use(flash());
app.use(flashMessage); // Pass in definition, don't call the function
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); //* Serve Static Assets in public/ directory

app.use(mongoSanitize());
// app.use(
//     helmet({
//         contentSecurityPolicy: false,
//         referrerPolicy: {policy: "no-referrer"}
//     })
// );

//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session()); //look at docs (must be after app.use(session))
//* Strategies need to Authenticate, Serialize, And Deserialize Users
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
app.use(currentSession); //* Add locals property currentUser



//! END OF MIDDLEWARE




//* ROUTES HANDLERS:
//? User Routes (no prefix needed)
app.use('/', userRoutes);
//? Camprounds Router:
app.use('/campgrounds', campgroundRoutes);
//? Reviews Routes:
app.use('/campgrounds/:id/reviews', reviewRoutes); //* need merge params in reviews.js file in order to access campgrounds' "id" param for the review routes.

app.get('/', (req, res) => {
    res.render('home');
});


//! Throws Error if not route has been hit yet -> Goes to Handler below
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
//? Error Handler:
//* 1 - app.all() for any routes that aren't anticipated
//* 2 - Custom Error Class --> throw in functions for specific cases we want to handle (i.e. empty query string or no req.body etc)
//* 3 - Try/Catch/Next OR --> mutate functions (Async Catching Errors Utility)
//* 4 - Catch-All Error Handler (see below: AFTER errors thrown to next(err))
//* ---use render() to utilize a ejs template
//* 5 - Joi (server-side validations of schema)
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = "Something Went Wrong";
    res.status(status).render('error', { err });
});

//* Sets Up Listening Port For Web App
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});