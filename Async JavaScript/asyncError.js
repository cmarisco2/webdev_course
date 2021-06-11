// Reuse fake request promise:

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
    });
}

// await resolution of 2 promises.
// store their values in variables.
// use try/catch to run code without crashing.
async function makeTwoRequests() {
    try {
        let data1 = await fakeRequestPromise('url1');
        console.log(data1);
        let data2 = await fakeRequestPromise('url2');
        console.log(data2);
    } catch (e) {
        console.log("Error", e);
    }
}

makeTwoRequests();