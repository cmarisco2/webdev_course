fetch('https://api.cryptonator.com/api/full/btc-usd')
    .then(res => {
        console.log("Respone in Progress: ", res);
        return res.json();
    })
    .then(data => {
        console.log("Actual Data:", data);
    })
    .catch(err => {
        console.log("Error: ", err);
    })

// Identical to above with syntactical sugar of async functions and await keyword.
// Need a try catch for errors
const getBitCoinJSON = async () => {
    const response = await fetch('https://api.cryptonator.com/api/full/btc-usd');
    const data = await response.json();
    console.log("Done all in a function:", data);
}

// const quickFetch = axios.get('https://api.cryptonator.com/api/full/btc-usd');

const bitPrice = async ()=> {
    try {
        const btc = await axios.get('https://api.cryptonator.com/api/full/btc-usd');
        console.log(btc.data.ticker.price);
    } catch(e){
        console.log("Mistakes Were Made", e);
    }
}
bitPrice();


