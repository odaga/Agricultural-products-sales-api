const mongoose = require('mongoose');
const ordersSchema = require('./Order');

const SellerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: String,
    LastName: String,
    email: String,
    password: String,
    fireBaseUserId: String,
    
});

mongoose.model('Seller', SellerSchema);
module.exports = mongoose.model('Seller');