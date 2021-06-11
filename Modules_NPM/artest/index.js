const figlet = require('figlet');
const colors = require('colors');

// from docs:
// syntax is equivalent of calling obj.method figlet.text(args);
figlet("You're Shrimp!!", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.green);
});