const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log('Connection to MongoDB Error has Occured');
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    });
    u.addresses.push({
        street: '123 Sesame Street',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    });

    const res = await u.save();
    console.log(res);
}


const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '12 Buckle My Shoe',
        city: 'York New',
        state: 'NY',
        country: 'USA'
    });
    const res = await user.save();
    console.log(res);
}

// makeUser();
addAddress('60774c02264cbb175410f030');