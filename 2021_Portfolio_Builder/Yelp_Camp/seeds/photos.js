const fs = require("fs");


const photoString = fs.readFileSync('photo_urls.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err)
    } else {
        return data;
    }
});

const photosArray = photoString.split('\n');


module.exports = photosArray;



