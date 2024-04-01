const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50,
    },
    password: {type: String, required: true, max: 50},
    // preferences: {type: Array, required: true, max: 50},
    preferences: { type: [String], default: [] },
    otp:String,
    likedMovies:[Number],
    // reviews: Array
});


module.exports.User = mongoose.model('User', userSchema);




