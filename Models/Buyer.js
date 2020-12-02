const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: String,
    LastName: String,
    email: String,
    password: String,
    fireBaseUserId: String
    
});

mongoose.model('Buyer', BuyerSchema);
module.exports = mongoose.model('Buyer');