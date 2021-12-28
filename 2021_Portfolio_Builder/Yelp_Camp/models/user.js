/**
 ** User Model:
 ** Uses passport for authentication 
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    }
});

//! Adds Fields for Username/Password and ensure uniqueness and other things
//* Adds username, hash, and salt
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);