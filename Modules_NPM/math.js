// Sharing js files


const add = (x, y) => { return x + y; }

const PI = 3.14;

const square = (x) => x ** 2;

module.exports.square = square;
module.exports.PI = PI;
module.exports.add = add;    