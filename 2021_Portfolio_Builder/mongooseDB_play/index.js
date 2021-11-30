//* Mongoose Setup and Demo
const mongoose = require('mongoose');

//? New way to connect. Uses async for connection definition. call() and catch 
async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

main()
    .then(() => console.log("Connection Open"))
    .catch(err => console.log(err));