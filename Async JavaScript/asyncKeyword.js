

const sing = async () => {
    return 'La La La La';
}

sing()
    .then((data) => {
        console.log(`Promise Resolved ${data}`);
    });


const login = async (username, password) => {
    if (!username || !password) throw "Missing Credentials";
    if (password !== 'puppy') throw "INVALID PASSWORD";
    return "WELCOME";
}

login('cake', 'puppy')
    .then(msg => {
        console.log('Logged In');
        console.log(msg);
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    });