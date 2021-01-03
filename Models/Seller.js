const mongoose = require('mongoose');
const ordersSchema = require('./Order');

const SellerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: String,
    LastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    fireBaseUserId: String,
    Orders: [{
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        price: String,
        productImage: String,
        productCategory: String,
        ownerId: String,
        buyerId: String,
    }]
    
});

mongoose.model('Seller', SellerSchema);
module.exports = mongoose.model('Seller');