/**
 ** Controller - Campgrounds
 * 
 * Meant For Moving Logic from the router/campgrounds for more modular approach.
 * Enables the MVC Design Pattern 
 */

const Campgroud = require('../models/campground');

//* INDEX
module.exports.index = async(req, res) => {
    const campgrounds = await Campgroud.find({});
    res.render('campgrounds/index', { campgrounds });
}

//* CREATE
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}
module.exports.createCampground = async (req, res) => {
    //? Need to use middleware to know how to parse 'req.body'
    //? Note: req.body.campground is an object => constructor doesn't require '{}'
    //* We Know that campground is posted in the body from 'new' form
    const campground = new Campgroud(req.body.campground);
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully, created a new campground'); //* flash before a redirect. Update the template below as well. middleware will ensure variable exists
    res.redirect(`/campgrounds/${campground._id}`);
}

//* SHOW
module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campgroud.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'); //* Populate Reviews
    if(!campground) return notFoundCampgroundFlash(req, res);
    res.render('campgrounds/show', { campground });
}

//* EDIT
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campgroud.findById(id);
    if(!campground) return notFoundCampgroundFlash(req, res);
    res.render('campgrounds/edit', { campground });
}
module.exports.editCampground = async (req, res) => {
    //INCORRECT -> Need to update NOT CREATE
    // const campground = new Campground(req.body.campground);
    // await campground.save();
    //?Get id from params. new data in the req.body. use spread operator to send as 2nd arg to findByIdAndUpdate
    const campground = await Campgroud.findByIdAndUpdate(req.params.id, {...req.body.campground});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    req.flash('success', 'Successfully Updated Campground');
    res.redirect(`/campgrounds/${campground._id}`);
}

//* DELETE -> sent via form w/button, overrided method, on existing form page (like SHOW)
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campgroud.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted Campground');
    res.redirect('/campgrounds');
}