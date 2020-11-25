const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firebase_user_id: {
        type: String
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        require: true
    },
    
    proifle_image_url: {
        type: String
    }
});

module.exports = mongoose.model('User', User);