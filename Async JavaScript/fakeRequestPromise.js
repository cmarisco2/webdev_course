const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4000) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Time Out Error');
            } else {
                resolve(`Data from site ${url}`);
            }
        }, delay);
    })
}


// Magic of promises.
// use of return statement allows chaining vice nesting. Takes advantage of "." dot notation.
// nest the next function call, but chain the next then()/catch()
// Also, only need one catch() at the end.

fakeRequestPromise('chris.com')
    .then(() => {
        console.log('I made it to page 1');
        return fakeRequestPromise('chris.com 2');
    })
    .then(() => {
        console.log('I made it to page 2');
        return fakeRequestPromise('chris.com 3');
    })
    .then(() => {
        console.log('I made it to page 3');
    })
    .catch(() => {
        console.log('Something fucked up');
    })