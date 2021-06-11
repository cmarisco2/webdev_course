// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png


// Selecting a container to append images to.
const container = document.querySelector('#container');


//Creating the image element and giving it a png source.
// const pokeImage = document.createElement('img');
// pokeImage.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');

//Appending the created image to the container as its first child.
// container.append(pokeImage);


//For the rest:
//save the url and update the number.png through the loop with a template literal structure.
//create element, add template literal as element's source, append to the container.


const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
// for (i = 2; i <= 151; i++) {
//     const nextImage = document.createElement('img');
//     nextImage.setAttribute('src', `${baseURL}${i}.png`);
//     container.append(nextImage);
// }

//Use JS DOM to create 151 divs>img+span
//customize img and span
//add img&span to DIV
//add DIV to Container.


for (let i = 1; i <= 151; i++) {
    const pokeDIV = document.createElement('div');
    const pokeLabel = document.createElement('span');
    const pokeImage = document.createElement('img');

    pokeLabel.innerText = `#${i}`;
    pokeImage.setAttribute('src', `${baseURL}${i}.png`);
    pokeDIV.classList.add('pokemon');

    pokeDIV.append(pokeImage, pokeLabel);
    container.appendChild(pokeDIV);
}




