/**
 ** Express Router Demo - Individual Route Files
 *
 ** 1 -> router = express.Router();
 ** 2 -> routes === 'router.get()' vice 'app.get()' etc.
 ** 3 -> export the routes 
 */
const express = require('express');
const router = express.Router();


//! Middleware that runs on every '/shelters' route in INDEX.JS
//? Adds '/shelters' as a prefix to the ROUTER from shelterRoutes
//? ---therefore, can remove the '/shelters' prefix in the shelter.js file
router.get('/', (req, res) => {
    res.send("All shelter Routes");
});

router.post('/', (req, res) => {
    res.send("Create new shelter")
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`viewing shelter ${ id }`);
});
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    res.send(`editing shelter ${ id }`);
});

module.exports = router;