/**
 ** Demo: 1 --> Bajillion! Relationship in MongoDB
 ** --store ref to Parent from Child
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;


async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}
main()
    .then(() => console.log("Connected To MongDB"))
    .catch(err => console.log(err));

//* Parent Schema (user's make tweets) 
const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    //* Stores Ref to Parent User
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

//? Example: 1 User, 2 Tweets.
//* 
const makeTweets = async () => {
    const twitterGuy = new User({username: 'Guy', age: 55});
    const tweet1 = new Tweet({text: 'YOLO', likes: 2});
    // 1-M used products.push(). Here, need only assign user property
    tweet1.user = twitterGuy;
    twitterGuy.save();
    tweet1.save()
        .then(() => {
            mongoose.connection.close();
        });
}

// makeTweets();
const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user');
    console.log(t);
}

findTweet();