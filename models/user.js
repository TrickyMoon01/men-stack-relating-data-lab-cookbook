const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pantry: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Food',
    }], //YOU DO: embed foodSchema here
});

const User = mongoose.model('User', userSchema);

module.exports = User; 