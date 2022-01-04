const Joi = require('joi');

//* Define Joi schema that does validation checks before passing off to the database:
//! schema itself -> object
//! campground -> object with fields (title, image, description, price, etc)
//! make each field that matters -> required.
//* type().required().additional()
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        author: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});