const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: String,
    username: String,
    comments: [
        {
            id: mongoose.Schema.Types.ObjectId,
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true});


module.exports = mongoose.model('Post', postSchema);