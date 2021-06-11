// using the axios library to retrieve the promise.


// returns a promise.
// then function cap value of resolved promise.

// axios.get() return the data in its value, not just headers like fetch.
axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(res.data.ticker.price);
    })
    .catch(err => {
        console.log(err);
    })


// ASYNC Version
// DON'T FORGET TO AWAIT THE ASYNC PROMISE CALL!!!
const getBitPrice = async () => {
    try {
        const request = await axios('https://api.cryptonator.com/api/ticker/btc-usd');
        const value = request.data.ticker.price;
        console.log(value);
    } catch (e) {
        console.log(e);
    }
}

getBitPrice();