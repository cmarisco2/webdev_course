// Utilizing Factory Functions to mimic a class


// Of NOTE:
// 1) 'This' refers to the object left of the dot '.'
// 2) 'This' works as above so long as not within an arrow function.
// 3) deconstruction can be used in the methods for renaming variables.
// 4) Beginning works like a constructor
// 5) Create Obj at the Beginning && Return that Obj at the End.
// 6)


function makeColor(r, g, b) {
    // Object/Class stand in
    const color = {};

    //fields & constructor (values from the function call needed for fields)
    color.r = r;
    color.g = g;
    color.b = b;

    // methods
    color.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
    color.hex = function () {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    // return the Object/Class stand in
    return color;
}

const firstColor = makeColor(35, 255, 150);


