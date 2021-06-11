
// Utilizing Promises to sequence the timing of color changes
const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay)
    })
}

// Changing colors via then chaining with returns.
delayedColorChange('red', 1000)
    .then(() => {
        return delayedColorChange('white', 1000);
    })
    .then(() => {
        return delayedColorChange('blue', 1000);
    })
    .then(() => {
        return delayedColorChange('yellow', 1000);
    })
    .then(() => {
        return delayedColorChange('orange', 1000);
    });