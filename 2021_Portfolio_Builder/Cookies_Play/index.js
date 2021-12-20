/**
 *? Application to Demo Sending Cookies
 */
const express = require('express');
const app = express();

//?Needed for parsing cookies:
const cookieParser = require('cookie-parser');
app.use(cookieParser('hidden-key')); //* With an arg (parse key), has signed capabilities



//* Send Cookies:
//* use "res.cookie" to set a key-value pair cookie
app.get('/setName', (req, res) => {
    //! Sending Cookie
    res.cookie('name', 'Sephiroth', { signed: true }); //* Adding Signed Propety
    res.send("Sent You a Signature Cookie, Chum!");
});

//* Retrieve Cookies:
//* use req.cookie -> typically, destructure for parsing
app.get('/greet', (req, res) => {
    const { name = "Anonymous" } = req.signedCookies;
    res.send(`Hello ${ name }`);
});


app.listen(3000, () => {
    console.log("Listening On Port 3000");
});