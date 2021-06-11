// Top level module to run franc and langs

const langs = require('langs');
const franc = require('franc-min');
const colors = require('colors');

const userString = process.argv[2] || "";
const langCode = franc(userString);
if (!userString || langCode === 'und') {
    console.log("SORRY, I COULDN'T FIGURE IT OUT. PLEASE TRY AGAIN".red);
} else {
    const langName = langs.where('3', langCode).name;
    console.log(`Our Best Guess is: ${langName.green}`);
}

