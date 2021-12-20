/**
 ** Demo: Sessions 
 *  
 */
const express = require('express');
const app = express();

//* Require module, use middleware:
const session = require('express-session');
app.use(session({secret: 'secretKey'}));


app.get('/viewcount', (req, res) => {
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`Your View Count, Sir? \n It's ${req.session.count}`);
});


app.listen(3000, () => {
    console.log("Serving From Port 3000");
});