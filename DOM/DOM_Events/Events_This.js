




randomRGBString = () => {
    const redHue = Math.floor(Math.random() * 256);
    const greenHue = Math.floor(Math.random() * 256);
    const blueHue = Math.floor(Math.random() * 256);
    return `rgb(${redHue}, ${greenHue}, ${blueHue})`;
}

const btns = document.querySelectorAll('button');
const h1s = document.querySelectorAll('h1');

// for (let btn of btns) {
//     btn.addEventListener('click', () => {
//         // console.log('clicked');
//         btn.style.backgroundColor = randomRGBString();
//         btn.style.color = randomRGBString();
//     });
// }

// for (let h1 of h1s) {
//     h1.addEventListener('click', () => {
//         h1.style.backgroundColor = randomRGBString();
//         h1.style.color = randomRGBString();

//     });
// }

//Utilizing 'this' in eventhandler refers to the element calling it.
// So h1.style can be this.style in a separate function.

//use this in the callback instead.
function colorize() {
    this.style.backgroundColor = randomRGBString();
    this.style.color = randomRGBString();
}

for (let btn of btns) {
    btn.addEventListener('click', colorize);
}

for (let h1 of h1s) {
    h1.addEventListener('click', colorize);
}