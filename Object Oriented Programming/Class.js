// Classes!
// Finally!!
// Similar to Java.
// Constructor method called immediately.
// Performs similarly to the constructor and new keyword when instanced.
// better method syntax.



// Fields unique to instance.
// methods shared among classes prototypes.

class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }

    rgb() {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    }


}

const tomato = new Color(255, 67, 89, 'Tomato');