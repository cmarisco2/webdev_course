/**
 * Using mongoose "Virtuals"
 * 
 * -adds properties to model
 * -Only accessible via mongoose (Virtually added. Not actually in the database)
 */

 const mongoose = require('mongoose');

 async function main() {
     await mongoose.connect('mongodb://localhost:27017/shopApp');
 }
 
 main()
     .then(() => console.log("Connection Open"))
     .catch(err => console.log(err => console.log("Error Occured", err)));

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

//! Adding virtual property to the schema
personSchema.virtual('fullName').get(function (){
    return `${this.first} ${this.last}`;
});

//Instantiate Schema
const Person = mongoose.model('Person', personSchema);