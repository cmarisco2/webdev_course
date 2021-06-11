const input = document.querySelector('input');
const heading = document.querySelector('h1');

//Change when leaving focus of the input
input.addEventListener('change', (e) => {
    console.log('detected');
});


//Change whenever the input in focus is adjusted.
input.addEventListener('input', (e) => {
    // console.log('Input! Detected!');
    if (input.value) {
        heading.innerText = input.value;
    } else {
        heading.innerText = 'Type Below:';
    }
});