

// Create a colors async function.

// const delayedColor = async (newColor, delay) => {
//     return setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//     }, delay);
// }

const delayedColor = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay)
    })
}

const nationalColors = async () => {
    await delayedColor('red', 1000);
    await delayedColor('white', 1000);
    await delayedColor('blue', 1000);
    await delayedColor('yellow', 1000);
    await delayedColor('green', 1000);
    return "All Done";
}

nationalColors()
    .then(msg => {
        console.log(msg);
    })