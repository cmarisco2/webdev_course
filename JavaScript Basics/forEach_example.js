// Example of the utility of a forEach array method.

const movies = [
    {
        title: 'Dark Knight',
        score: 88
    },
    {
        title: 'No Country for Old Men',
        score: 94
    },
    {
        title: 'Catwoman',
        score: -100
    }
];

movies.forEach(function (movie) {
    console.log(`${movie.title} - ${movie.score}/100`);
});