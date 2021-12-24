/**
 ** Demo bcrypt library for cryptographic hashing functions for passwords
 *
 */
const bcrypt = require('bcrypt');


//* Generate hash (salt then hash)
const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}
//! can instead do both in 1 step: 
//! const hash = await bcrypt.hash(pw, 12)

hashPassword('password123'); //? result stored in db

//* Verify the Password
const login = async (pw, hashedPW) => {
    const result = await bcrypt.compare(pw, hashedPW);
    if(result) return console.log("Successful Login");
    return console.log("Failed Attempt");
}

login('password123', '$2b$10$3QU6klIplFvqHgSPARY6mOsyDvdfubZCxcFYwJ/y8lpIVgatktwT2');

