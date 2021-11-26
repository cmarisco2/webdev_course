// Requires the fs module
const fs = require('fs');
const folderName = process.argv.slice(2);

fs.mkdirSync(folderName);

fs.writeFileSync(`${folderName}/index.html`);
fs.writeFileSync(`${folderName}/styles.css`);
fs.writeFileSync(`${folderName}/app.js`);