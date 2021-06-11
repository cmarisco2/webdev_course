
const tweetForm = document.querySelector('#tweetForm');
const container = document.querySelector('#tweets');
// tweetForm.addEventListener('submit', (e) => {
//     console.log('Submitted!');
//     e.preventDefault();
// })


tweetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = tweetForm.elements.username.value;
    const tweet = tweetForm.elements.tweet.value;

    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');

    bTag.append(username);
    newTweet.append(bTag);
    newTweet.append(` -${tweet}`);

    container.append(newTweet);
})