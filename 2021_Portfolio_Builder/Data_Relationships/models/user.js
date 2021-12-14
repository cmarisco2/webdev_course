/**
 ** Demo: 1 --> Few Relationship in MongoDB
 */
const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}
main()
    .then(() => console.log("Connected To MongDB"))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    //* Note: to make an array of a specific type -> use [] and define the internals {}
    address: [
        {
             city: String,
            state: String,
            street: String,
            country: {
                type: String,
                required: false
            }

        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Spike',
        last: 'Spiegel',
        address: {
            city: 'Astroid Belt',
            state: 'Sindicate Alley',
            street: '1212',
            country: 'Japan'
        }
    });

    u.address.push({
        //? _id: { id: false }, //if want to get rid of generated id
        street: '123 Sesame St',
        city: 'New York',
        state: 'NY',
        coutry: 'USA'
    });
    // const res = await u.save();
    console.log(res);
};

makeUser()
    .then(() => {
        mongoose.connection.close();
    });