const searchForm = document.querySelector('#searchForm');

// Saves Search Term from Form input
// Send to the api call via axios
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Note 'query' is just the 'name' attribute of the text input
    const searchTerm = searchForm.elements.query.value;
    // Get JSON of Show Data as a JS Object Literal
    try { 
        // NOTE the String Template Literal is Useful here.
        // CAN USE {params: {q: searchTerm}, headers: {}} }
        const show = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`);
    // Create new image element and make its source from the found show.
        const newImage = document.createElement('img');
        newImage.src = imageFromShow(show);
    // Add the image to the ul as a child element.
        document.body.append(newImage);
    } catch(error){
        console.log("Unexpected Error Occured", error);
    }
});

// Creates an image from the Show Object Literal returned via the TVSHOWMAZE API call.
const imageFromShow = (showObj) => {
    if(showObj.data.image.medium){
        return showObj.data.image.medium;
    }
}