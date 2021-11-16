const button = document.querySelector('#v1');

// Find "On" Events on MDN
button.onclick = function(){
    console.log('you clicked me?');
}

function scream(){
    console.log('AHHHH');
}
button.onmouseenter = scream;

document.querySelector('h1').onclick = () => { alert("Hey Man!");}

// addEventListener
const btn = document.querySelector('#v2');

btn.addEventListener('click', ()=> {
    alert('Yo!');
});

btn.addEventListener('mouseup', ()=> {
    console.log('Mouse Up!');
});

const input = document.querySelector('#textData');
const form = document.querySelector('#actionForm');
const list = document.querySelector('#list');

form.addEventListener('submit', (e)=>{
    // prevent Default Behavior
    e.preventDefault();
    // get input property to see what was written (value)
    const newData = input.value;
    // create Element
    const newLI = document.createElement('LI');
    // give Element's innerText the value
    newLI.innerText = newData;
    // append (add as a child of) to the list element
    list.append(newLI);
});


// check via console.dir() for input properties.


