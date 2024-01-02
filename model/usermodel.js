const mongoose = require('mongoose');

// first we need to creae schema for user 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unigue: true,
        min: 6,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    refresh_token: {
        type: String,
        default: ''
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;