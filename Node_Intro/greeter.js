// Using the process.argv to return an array of command line args.
// ignoring the first 2 args via slice(2)

const args = process.argv.slice(2);
for (let arg of args) {
    console.log(`Hello ${arg}`);
}