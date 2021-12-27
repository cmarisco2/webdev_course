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

module.exports = mongoose.model('User', userSchema);