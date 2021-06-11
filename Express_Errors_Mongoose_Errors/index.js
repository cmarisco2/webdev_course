const express = require('express');
const app = express();
// New middleware:
const morgan = require('morgan');
// custom App Class requirement:
const AppError = require('./AppError');
// Use middleware:
// app.use(morgan('dev'));
// custom middleware:
app.use((req, res, next) => {
    console.log('This is my first middleware');
    next();
});

// middleware to check the http request used:
app.use((req, res, next) => {
    console.log(req.method.toUpperCase(), req.path);
    next();
});

// function to check correct query string:
const verifyPass = (req, res, next) => {
    const { password } = req.query;
    if (password === 'AOT') {
        next();
    }
    throw new AppError('Incorrect Password Used Sir!', 401);
}

// Dummy Routes
app.get('/', (req, res) => {
    res.send('HOME PAGE!');
});
// Protected Route:
app.get('/dogs', verifyPass, (req, res) => {
    res.send('Woof Woof!');
});



// 404 Middleware:
app.use((req, res) => {
    res.status(404).send('Not Found');
});
// Example of handling async errors of known and unknown type:
// 1) the if(!product) statement handles the result of a null response from our database.
// 2) However, other errors may occur (validation of inappropriate data) that effect DB/API in ways not forseen:


// app.get('/products/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.getById(id);
//         if (!product) {
//             throw new AppError('Cannot find product', 501);
//         }
//         res.render('products/show', { product });

//     } catch (e) {
//         next(e);
//     }
// });

// ^ Above catch cand handle the thrown error explitly defined. Or any error that occurs otherwise.
// next(e), usually return next(AppErr) if done without a catch clause, will invoke the next error handler.

// Example of using a utility function to return a function vice copying try and catch numerously:
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

// Use Case:
// app.get('/products/:id', wrapAsync(async (req, res, next) => {
//     // Body without the try and catch. Still only need to throw vice call next because wrapAsync will handle that.
// }));

// Custom Error Handler:
app.use(function (err, req, res, next) {
    const { status = 501, message = 'Something Bad Occured' } = err;
    res.status(status).send(message);
    next(err);
});

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});