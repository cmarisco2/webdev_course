const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Dogs Go To Heaven');
});
router.post('/', (req, res) => {
    res.send('Create Dog Route');
});
router.get('/:id', (req, res) => {
    res.send(`View Dog ${req.params.id}`);
});
router.get('/:id/edit', (req, res) => {
    res.send('Edit The Dog Route');
});


module.exports = router;