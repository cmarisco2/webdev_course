// Creating Promises.

//General Syntax:
// 
// CLASS based architecture

// CODE:
// new Promise((resolve, reject) => {
//     // code that calls either resolve()
//     // or reject()
// })


// simple example:

// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (url && url.length > 5) resolve();
//             else reject();
//         }, 2000);
//     })
// }

// fakeRequest('abc.')
//     .then(() => {
//         console.log('request completed');
//     })
//     .catch(() => {
//         console.log('request canceled');
//     });

// function testing url connection
const connectSuccess = (url) => {
    // Promise created internal to function.
    // randomness of connection testing simulated:
    const randProb = Math.random();
    return new Promise((resolve, reject) => {
        // Async function necessary for promise.
        setTimeout(() => {
            if (randProb > 0.6) resolve('Your connection is secure');
            else reject('Your connection failed');
        }, 3000);
    });
}

connectSuccess('www.helloworld.com/p1')
    .then((data) => {
        console.log('request 1 passed');
        console.log(data);
        return connectSuccess('www.helloworld.com/p2');
    })
    .then((data) => {
        console.log('request 2 passed');
        console.log(data);
        return connectSuccess('www.helloworld.com/p3');
    })
    .then((data) => {
        console.log('request 3 passed');
        console.log(data);
    })
    .catch((err) => {
        console.log('request FAILED');
        console.log(err);
    });