const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = mongoose.model('User', userSchema);