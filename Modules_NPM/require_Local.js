// use the math modules properties.

// destructure
// uses math.js in same path
const { add, PI, square } = require('./math');
console.log(`The values retrieved are ${PI}, the sum of 1 + 1 = ${add(1, 1)}, and 5 squared = ${square(5)}`);