const mongoose = require('mongoose');
const Anime = require('./models/anime');

mongoose.connect('mongodb://localhost:27017/AnimeApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(err => console.log(err));


const aot = new Anime({
    title: 'Attack On Titan',
    score: 8.49,
    description: 'A world where mankind is driven to the brink of extinction by the existence of Titans outside their walls.',
    author: 'Hajime Isayama'
});

// aot.save()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.log(error);
//     });

const aniShows = [
    {
        title: 'My Hero Academia',
        score: 8.23,
        description: 'Children are born into a world with super powers called quirks. Some become heros and attend various super hero academies while some chose the life of crime. This story follows a boy born without any powers in his quest to become the greatest super hero of all time.',
        author: 'Kouhei Horikoshi'
    },

    {
        title: 'Full Metal Alchemist: Brotherhood',
        score: 9.18,
        description: `Two brothers, in a steampunk world, violate the land's natural laws of alchemical equivalent exchange and pay a severe price. In efforts to remedy their fate they become entangled in conflicts surrounding relationships, truth, and the nature of life itself.`,
        author: 'Hiromu Arakawa'
    },

    {
        title: 'Death Note',
        score: 8.63,
        description: `High school student and prodigy Light Yagami stumbles upon the Death Note and—since he deplores the state of the world—tests the deadly notebook by writing a criminal's name in it.`,
        author: 'Tsugumi Ohba'
    },

    {
        title: 'Hunter X Hunter',
        score: 9.09,
        description: `Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined.
        .`,
        author: 'Yoshihiro Togashi'
    }
];

// Anime.insertMany(aniShows)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));