const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Cannont Be Blank']
    },
    password: {
        type: String,
        required: [true, 'Password Cannont Be Blank']
    }
});

//! Add static method to class:
userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({username});
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

//! Add middleware to hash passwords with model vice the index.js
//! 1) pre/post
//! 2) pass next as param
//! 3) call next() at the end 
//* ex: userSchema.pre('save', function(next)) ... //commands ... next()
//! NOT STATIC -> 'this' is for the INSTANCE
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);