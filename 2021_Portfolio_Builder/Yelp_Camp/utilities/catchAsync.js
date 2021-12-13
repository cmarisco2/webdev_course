//* Create wrapper Function to add error handling to async functions.
const catchAsync = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

module.exports = catchAsync;