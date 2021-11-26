// Using 2 NPM Packages for testing package.json
// If node_modules/ is deleted -> "npm install" at CLI will install dependencies from package.json

const figlet = require('figlet');
const colors = require('colors');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.green);
});