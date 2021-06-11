// Building Anime Schema Model for use.
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },

    score: {
        type: Number,
        require: true,
        min: 0
    },

    description: String,

    author: {
        type: String,
        required: true,
        lowercase: true
    }
});

const Anime = mongoose.model('Anime', animeSchema);


module.exports = Anime;
