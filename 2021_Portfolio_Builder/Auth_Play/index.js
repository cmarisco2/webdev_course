/**
 ** Basic Auth App:
 ** Uses Express, Mongoose, EJS, BCRYPT
 */
const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');


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
app.use(session({secret: 'secretCode'}));


//* Gets Form To Register User
app.get('/register', (req, res) => {
    res.render('register');
}) //* make user (async, postrequest, parsebody)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({username, password: hash});
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
});

//* Form To Verify User's Authorization
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); //? This is why usernames need be unique
    const validPassword = await bcrypt.compare(password, user.password);
    if(!user || !validPassword) res.send('Incorrect Username Or Password');
    if(validPassword) {
        req.session.user_id = user._id;
        res.redirect('/secret');
    }

});

app.get('/', (req, res) => {
    res.send('Home Page');
});
app.get('/secret', (req, res) => {
    if(!req.session.user_id) return res.redirect('/login');
    res.send("This Path is Secret");
});


app.listen(3000, () => {
    console.log("Serving Your App");
});