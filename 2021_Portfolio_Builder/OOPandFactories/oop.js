

// Factory Functions - THIS MAKES MULTIPLE COPIES OF THE SAME PROPERTIES!!! NOT PREFERED FOR MAKING A DATA TYPE (COULD UPDATE THE PROTOTYPE INSTEAD OR USE CLASSES)
// --Create "types"/"clases" via a function call() with parameters.
// Just a function with an object as a field.

// Add private fields to the object with "." notation.
// --used to add instance fields and 'methods.'

// RETURN Statement needed to return the Object literal.

function makeColor(r, g, b){
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;

    color.rgb = function(){
        const {r, g, b} = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    return color;
}

const firstColor = makeColor(244, 128, 17);
const secondColor = makeColor(155, 255, 155);

console.log(firstColor.rgb());
console.log(secondColor.rgb());

// Constructors and New 
// Adds properties to the 'class';
// Still a function for making a type.


/* CONSTRUCTOR FUNCTION */
function Color(r, g, b){
    // Add Fields to the Object.
    this.r = r;
    this.g = g;
    this.b = b;
}

// Adds methods to the Prototype
// Things added to Prototypes are shared to all of that type (like 'Static')
// So color1.rgb === color2.rgb is TRUE
Color.prototype.rgb = function(){
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
}

/* NEW KEYWORD */
// Create Object like Java:
const color1 = new Color(155, 0, 0);


/** CLASS:  **/

// Similar to Java/C# 
// Destructuring fields in the methods is prefered.

class Color2{

    constructor(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    rgb(){
        const {r, g, b} = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
}

const thirdColor = new Color2(1,2,3);
