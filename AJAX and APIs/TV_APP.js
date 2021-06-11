const searchForm = document.querySelector('#searchForm');

// Use TV Maze API for the query string:
// URL: /search/shows?q=:query
// Example: http://api.tvmaze.com/search/shows?q=girls
// await axios.get([above query string with our terms])

searchForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const searchTerm = searchForm.elements.query.value;
    const request = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    // console.dir(request);
    // console.dir(request.data);
    // console.log(request.data[0].show.name);
    // const showImage = document.createElement('img');
    // showImage.src = request.data[0].show.image.medium;
    // document.body.append(showImage);

    makeImage(request.data);

});

const makeImage = (data) => {
    for (datem of data) {
        if (datem.show.image) {
            const showImage = document.createElement('img');
            showImage.src = datem.show.image.medium;
            document.body.append(showImage);
        }
    }
}