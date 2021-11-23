const jokes = document.querySelector('#jokes');
const btn = document.querySelector('button');

const dadJoke = async () => {
    // REQUEST (API request with async and await)
    const config = { headers: { Accept: 'application/json' } };
    const res = await axios.get('https://icanhazdadjoke.com', config);

    // DOM
    // Create new element -> LI
    const newLI = document.createElement('li');
    // put joke in new element -> append()
    newLI.append(res.data.joke);
    // add new element to the existing element UL
    jokes.append(newLI);
}

btn.addEventListener('click', () => {
    dadJoke();
});
