const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log('Connection to MongoDB Error has Occured');
        console.log(err);
    });

// User Schema:
const userSchema = new Schema({
    name: String,
    age: Number
});
// Tweet Schema: 
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
// User and Tweet Models:
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// Create a User and Tweet. Assign User to Tweet. Save Both.
const makeTweet = async () => {
    const user = new User({ name: 'Jaegarist99', age: 27 });
    const tweet1 = new Tweet({ text: 'Down With Marley!', likes: 1500 });
    tweet1.user = user;
    user.save();
    tweet1.save();
}

// makeTweet();

// Find a User, Create a Tweet. Link User to Tweet. Save Tweet.
const addTweet = async () => {
    // const user = new User({ name: 'Jaegarist99', age: 27 });
    const user = await User.findOne({ name: 'Jaegarist99' });
    const tweet2 = new Tweet({ text: "I'm Just Like You, Reiner. Just Like You", likes: 35000 });
    tweet2.user = user;
    tweet2.save();
}

// addTweet();

const findTweet = async () => {
    const twit = await Tweet.findOne({}).populate('user', 'name');
    console.log(twit);
}

findTweet();