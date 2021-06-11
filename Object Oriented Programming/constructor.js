// 1) Capitalize the function/class name
// 2) assign the fields with the "This" keyword.


// CODE:
function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}
// 'This' not within an object has global (window) scope.
// The constructor function returns undefined.

// The new keyword does the following things:

// 1)Creates a blank, plain JavaScript object.
// 2)Adds a property to the new object (__proto__) that links to the constructor function's prototype object
// Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using new).

// 3)Binds the newly created object instance as the this context (i.e. all references to this in the constructor function now refer to the object created in the first step).
// 4)Returns this if the function doesn't return an object.


// Now callable from every instance of 'Color' from a single copy.
Color.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
}

const red1 = new Color(255, 0, 0);
const green1 = new Color(0, 255, 0);