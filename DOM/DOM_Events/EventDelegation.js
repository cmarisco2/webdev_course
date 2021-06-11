
const tweetForm = document.querySelector('#tweetForm');
const container = document.querySelector('#tweets');
const listItems = document.querySelectorAll('li');
// tweetForm.addEventListener('submit', (e) => {
//     console.log('Submitted!');
//     e.preventDefault();
// })

for (let li of listItems) {
    li.addEventListener('click', () => {
        li.remove();
    });
}


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

container.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') e.target.remove();
});