const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/personApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Successful!!!');
    })
    .catch(err => {
        console.log('Oh no, an error has occured:');
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    fname: String,
    lname: String
});

// Virtuals:
personSchema.virtual('fullName').get(function () {
    return `${this.fname} ${this.lname}`;
});

// Middleware:
personSchema.pre('save', async function () {
    console.log('About to Save!');
});

personSchema.post('save', async function () {
    console.log('Just Saved!');
});

const Person = mongoose.model('Person', personSchema);