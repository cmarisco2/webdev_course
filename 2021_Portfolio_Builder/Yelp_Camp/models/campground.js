const mongoose = require('mongoose');
//alias
const Schema = mongoose.Schema;
const Review = require('./review');


const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
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

module.exports = mongoose.model('Campground', campgroundSchema);

