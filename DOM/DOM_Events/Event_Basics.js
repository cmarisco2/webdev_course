
//Using the "ON" Property of the Element to add methods.
const btn = document.querySelector('#v2');

function scream() {
    console.log("You are over me!");
}

btn.onclick = () => {
    alert('You clicked button 2.0');
    console.log('You clicked me too!');
}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
    console.log('You touched the h1...inappropriately')
}

//Using the Event Listeners to add methods.
const button = document.querySelector('#v3');

button.addEventListener('click', () => {
    // alert("You clicked me three!")
    console.log("You clicked the best button :)");
})