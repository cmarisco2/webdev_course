/**
 ** Express Router Demo - Index.js (route hub js file)
 *
 ** 1 -> shelterRoutes = require('./routes/shelters');
 ** 2 -> app.use('/shelters', shelterRoutes) 
 */

/**
 ** Express Router Demo - Individual Route Files
 *
 ** 1 -> router = express.Router();
 ** 2 -> make paths BUT use 'router.get()' vice 'app.get()' etc.
 ** 3 -> export the routes 
 */
const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');

//! Middleware that runs on every '/shelters' route
//! Adds '/shelters' as a prefix to the ROUTER from shelterRoutes
//? ---therefore, can remove the '/shelters' prefix in the shelter.js file
app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);



app.listen(3000, () => {
    console.log("Listening on Port 3000");
});