/**
 ** More MiddleWare Practice. 
 ** Manipulating the request object and sending custom functions to middleware. 
 */
const express = require('express');
const app = express();

//?Cutom Error Handler
const AppError = require('./AppError');


//! ORDER MATTERS: IF get('/') runs first:
//* a) "req.requestTime" won't exist on its function call.
//* b) "res.send()" will end the request cycle -> middleware NEVER EXECUTES
app.use((req, res, next) => {
    // req.method = 'POST'; //* To Show That req can be manipulated!
    req.requestTime = Date.now(); //* Adds new property for our use on req obj!
    console.log(req.method, req.path);
    return next();
});

//! CAN RUN ON SPECIFIC ROUTES ONLY TOO!
app.use('/dogs', (req, res, next) => {
    console.log("I love dogs");
    next();
});


app.get('/', (req, res) => {
    console.log("REQUEST TIME AND DATE:", `${req.requestTime}`);
    res.send("Home");
});

app.get('/dogs', (req, res) => {
    res.send("Wolf Home");
});

/**
 *! Protect Routes and Define Middleware Functions: 
 *
 *? Define Function as Middleware:
 ** Needs 1) 3 args (req, res, next)
 ** Needs 2) call next() somehow
 *
 *? Protect Routes:
 ** Needs 1) pass function as second arg in route
 *
 ** Similar to the use() for a specific route but more modular. 
 ** --ex: simpleWare can be passed in any route vice calling app.use('/cats', (req,res,next)) 
 */
const simpleWare = (req, res, next) => {
    console.log("This is for the /cats route only");
    return next();
}
app.get('/cats', simpleWare, (req, res) => {
    res.send("Meow");
});


//* Intentional invocation of an error (chicken.fly() is not defined anywhere)
app.get('/error', (req, res) => {
    const { name } = req.query;
    
    if(name !== "Chris"){
        //! Custom Error Thrown
        throw new AppError(401, "Need Query String");
    }
    res.send(req.query);
});

app.get('/admin', (req, res) => {
    throw new AppError(403, "You Are Not Authorized to view Admin Directory");
})


//? RUNS ONLY IF NO OTHER ROUTE IS HIT
//! NOT FOUND ERROR:
 app.use((req, res) => {
     res.status(404).send("Not Found!");
 });



//! Error Handler:
//? RUNS WHEN AN ERROR OCCURS IN A ROUTE
//* Set as LAST route before listening
//* 4 args (err, req, res, next) -> NEEDS "err" and "next" to be recognized w/ req/res
//* app.use() holds the function witht the args, typically
//? NOTE: This Function will catch any error and handle it. Use Defaults for catch alls.
app.use((err, req, res, next) => {
    const { status = 500, message = "Error" } = err;
    res.status(status).send(message);

}); 

app.listen(8080, () => {
    console.log("Listening on Server Port 8080");
});