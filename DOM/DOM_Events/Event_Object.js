document.querySelector('button').addEventListener('click', () => {
    alert('Clicked!');
});

const input = document.querySelector('input');

input.addEventListener('keydown', (e) => {
    console.log(e.key);
    console.log(e.code);
});

// input.addEventListener('keyup', () => {
//     console.log('KEY UP');
// });

//Videogame style (add to window for the keys I want)

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            console.log("UP!");
            break;

        case 'ArrowDown':
            console.log('DOWN!');
            break;

        case 'ArrowRight':
            console.log('RIGHT!');
            break;

        case 'ArrowLeft':
            console.log('LEFT!');
            break;

        default:
            console.log('Ignored');
    }
})