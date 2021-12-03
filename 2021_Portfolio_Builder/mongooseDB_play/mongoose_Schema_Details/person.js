/**
 ** Using mongoose "Virtuals"
 * 
 ** -adds properties to model
 ** -Only accessible via mongoose (Virtually added. Not actually in the database)
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
//! Typically when we want properties derived from data on the db without adding extra data to the db.
personSchema.virtual('fullName').get(function (){
    return `${this.first} ${this.last}`;
});





/**
 ** Mongoose MiddleWare - pre/post
 ** "Hooks" -> runs before/after normal functions.
 *
 *? -use 'next' as param in callback ('save', function(next){
 *? //Do Something
 *? next()
 *? })
 ** -OR
 *? -Return a Promise ('save', async function(){
 *? await doStuff()    
 *? })
 *
 *! Apart of Schema definition - personSchema.pre()
 */

personSchema.pre('save', async function(){
    console.log('About To Save');
    this.first = 'Yo';
    this.last = 'Mama';
});

personSchema.post('save', async function(){
    console.log('I just saved!....mmmm...yeah...');
});



//Instantiate Schema
 const Person = mongoose.model('Person', personSchema);
