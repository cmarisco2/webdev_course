// Fetch Requests

fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

// WRAP IN A TRY CATCH to catch errors like above.
// This is just using promises like the fetch above.
const fetchBitCoinPrice = async () => {
    // Both functions return promises and therefore need to 'await' the results.
    const promisingResult = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
    const data = await promisingResult.json();

    console.log(data.ticker.price);
}

fetchBitCoinPrice();