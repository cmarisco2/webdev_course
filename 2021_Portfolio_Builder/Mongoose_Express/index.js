/**
 * 
 ** "Putting It All Together" 
 * 
 * 
 ** Basic Setup in Section 38 vid 396 for reference 
 */
//! Setup - Start
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/product');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
}
main()
    .then(() => console.log("Connected To Mongo"))
    .catch(err => console.log("Connection Error", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//! Setup - End


//?Routes:
app.get('/dog', (req, res) => {
    res.send('Connected On the Dogs Route');
});



//? Listening
app.listen(3000, () => {
    console.log("App is Listening on Port 3000");
});