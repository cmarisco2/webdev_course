// Uses the File System from Node.js DOCS


// Creating a JS file that takes the first command line arg supplied by the user (arg number 3)
// and Creates a new project folder with the arg's name
// as well as 3 files inside the new folder (js,css,html files)


// Get the folder name from CLI:
const fs = require('fs');
const folderName = process.argv[2] || 'Project';
// import { mkdirSync, writeFileSync } from 'fs';


// Create folder of said name in desired filepath (current if just name):
try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/${folderName}.html`, '');
    fs.writeFileSync(`${folderName}/${folderName}.js`, '');
    fs.writeFileSync(`${folderName}/${folderName}.css`, '');
} catch (e) {
    console.log(`Something went wrong`, e);
}