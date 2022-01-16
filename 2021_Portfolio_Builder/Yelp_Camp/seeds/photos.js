/**
 * Helper Module for seeds/index.js.
 * Takes the url text and reads it as a string.
 * Exports an array deliminated on each newline character separating the url
 * 
 ** 62nd Char begins filename, 91st Char ends it.
 *
 */
const fs = require("fs");
const photoString = fs.readFileSync('photo_urls.txt', 'utf8', (err, data) => {
    err ? console.log(err) : data
});

module.exports = photoString.split('\n');



