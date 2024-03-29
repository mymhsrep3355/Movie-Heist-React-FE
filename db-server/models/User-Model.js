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
    preferences: { type: [String], default: [] }
    // likedMovies: {type: Array, required: true, max: 50},
    // reviews: Array
});

module.exports.User = mongoose.model('User', userSchema);





// const mongoose = require('mongoose');

// //A review by user
// const reviewSchema = new mongoose.Schema({
//     movieId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Movie',
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5
//     },
//     comment: {
//         type: String,
//         required: true,
//         maxlength: 700
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// //User schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         max: 50,
//     },
//     preferences: Array,
//     likedMovies: Array,
//     reviews: [reviewSchema]
// });

// module.exports.User = mongoose.model('User', userSchema);
