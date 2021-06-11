// Fake requests using callbacks for success and failure.


const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4000) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure();
        } else {
            success();
        }
    }, delay);
}

fakeRequestCallback('chris.com',
    () => {
        console.log('it worked!');
    }, () => {
        console.log('Timed Out');
    });