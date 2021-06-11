// Axios with Async functions getting Dad Jokes.


// Returns the whole html page.
// const getDadJokePage = async () => {
//     const request = await axios.get('https://icanhazdadjoke.com/');
//     console.log(request);
// }


// Uses Headers!
// Returns just the JSON as an object literal.
// Use the objects properties to return the joke.


// async function to GET data
const getDadJoke = async () => {
    // header setup:
    const config = { headers: { Accept: 'application/json' } }
    // use 2nd arg to pass the config
    const request = await axios.get('https://icanhazdadjoke.com/', config);

    const joke = request.data.joke;

    // String is in this promise. Need to use another async function with 
    // await to access directly.
    return joke;
}

// Area to display jokes
const listArea = document.querySelector('#jokes');


const addDadJoke = async () => {
    // list item to add later.
    const listItem = document.createElement('li');

    //find joke 
    const joke = await getDadJoke();

    // append joke to the list item.
    // Then append the list item to the list area.
    listItem.append(joke);
    listArea.append(listItem);

}

// button to add jokes.
const btn = document.querySelector('button');
btn.addEventListener('click', addDadJoke);