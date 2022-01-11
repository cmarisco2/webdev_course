const mongoose = require('mongoose');
//alias
const Schema = mongoose.Schema;
const Review = require('./review');


const ImageSchema = new Schema({
        url: String,
        filename: String
});

//* edits url for thumbnail version using cloudinary.
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200, h_200');
});

//* Need Option to allow virtuals to convert to JSON
const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [ Number ],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

//* Nests virtual property in model for access by clusterMap.js
campgroundSchema.virtual('properties.PopupText').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 50)}....</p>`;
});

//!Mongoose middleware REQUIRES analyzing docs just to hit correct middleware
//* Post middleware:
//* 1 - has access to the deleted campground as arg 'doc'
//* 2 - called on 'findOneAndDelete' though triggering function is 'findByIdAndDelete' -> AGAIN READ THE RED COMMENT ABOVE
//* 3 - can examine deleted doc --> Delete Refs in Separate Doc (campgrounds -> reviews)
//! 4 - No Need to change original delete campground route! just add middleware to mutate the deleted object!
campgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});
const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;

