





const btn = document.querySelector('button');
const heading = document.querySelector('h1')

randomRGBString = () => {
    const redHue = Math.floor(Math.random() * 256);
    const greenHue = Math.floor(Math.random() * 256);
    const blueHue = Math.floor(Math.random() * 256);
    return `rgb(${redHue}, ${greenHue}, ${blueHue})`;
}

btn.addEventListener('click', function () {
    // document.body.style.backgroundColor = 'olive';
    const shade = randomRGBString();

    document.body.style.backgroundColor = shade;
    heading.innerText = shade;
});