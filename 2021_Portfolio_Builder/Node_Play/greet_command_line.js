// process is an object of global scope with loads of system data.

for(let arg of process.argv.slice(2)){
    console.log(`Hello ${arg}`);
}