/**
 ** Basic Auth App:
 ** Uses Express, Mongoose, EJS, BCRYPT
 */
const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//* Connect To Mongoose
async function main() {
    await mongoose.connect('mongodb://localhost:27017/authDemo');
}
main()
    .then(() => console.log("Connected To MongoDB"))
    .catch(err => console.log(err));
//*

app.use(express.urlencoded({extended:true}));


//* Gets Form To Register User
app.get('/register', (req, res) => {
    res.render('register');
}) //* make user (async, postrequest, parsebody)
app.post('/register', async (req, res) => {
    res.send(req.body);
})


app.get('/secret', (req, res) => {
    res.send("This Path is Secret");
});


app.listen(3000, () => {
    console.log("Serving Your App");
});