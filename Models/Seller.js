const mongoose = require('mongoose');
const ordersSchema = require('./Order');

const SellerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    location: String,
    firebaseUserId: String,
    orders: [{
        _id: mongoose.Schema.Types.ObjectId,
        productId: String,
        name: String,
        price: String,
        quantity: String,
        productImage: String,
        productCategory: String,
        ownerId: String,
        buyerId: String
    }]
    
});

mongoose.model('Seller', SellerSchema);
module.exports = mongoose.model('Seller');