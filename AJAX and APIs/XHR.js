// Old outdated way to send http requests.


// Make new xmlhttprequest obj

const req = new XMLHttpRequest();

// Add onload and onerror methods

req.onload = function () {
    console.log("ALL DONE WITH REQUEST!!!");
    const data = JSON.parse(this.responseText);
    console.log(data.ticker.price);
}

req.onerror = function (e) {
    console.log("ERROR", e);
    console.log(this);
}

// open the request
req.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd')

// send the request
req.send();