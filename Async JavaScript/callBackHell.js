// One way to make background colors change every sec
//involves incrementally changing the second arg.
// CODE:
// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
// }, 1000);
// setTimeout(() => {
//     document.body.style.backgroundColor = 'white';
// }, 2000);
// setTimeout(() => {
//     document.body.style.backgroundColor = 'blue';
// }, 3000);


// better way is to use the call stack -> webapi -> task queue -> event loop
//nesting will remove the call from the stack.
// webapi will do the timing of the outer most function.
//place its contents into the task queue when timing is complete.
//event loop will dequeue the first element ONLY when the stack is empty.

// The times will go from outer to inner as well.
// CODE:
// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'yellow';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'blue';
//         }, 1000);
//     }, 1000);
// }, 1000);

//In General:
// CODE:
// const delayedColorChange = (newColor, delay) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//     }, delay);
// }

// delayedColorChange('teal', 3000);

// doNext needs to be a callback function.
const delayedColorChange = (newColor, delay, doNext) => {
    setTimeout(() => {
        document.body.style.backgroundColor = newColor;
        doNext && doNext();
    }, delay);
}

delayedColorChange('red', 1000, () => {
    delayedColorChange('white', 1000, () => {
        delayedColorChange('blue', 1000, () => {

        })
    })
})


