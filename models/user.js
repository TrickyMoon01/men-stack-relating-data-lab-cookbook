const mongoose = require('mongoose');

// user.js

const foodSchema = new mongoose.Schema({
    pantry: {
    name: String,
    type: String,
    required: true,
    } // YOU DO: Define properties of food schema
});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pantry: [foodSchema], //YOU DO: embed foodSchema here
});

const User = mongoose.model('User', userSchema);

module.exports = User; 