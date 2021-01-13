const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    phoneNUmber: String,
    fireBaseUserId: String,
    cart: [{
        _id: mongoose.Schema.Types.ObjectId,
        productId: String,
        name: String,
        description: String,
        price: Number,
        quantity: Number,
        productCategory: String,
        productImage: String,
        ownerId: String,
        buyerId: String,
        ownerPhoneNumber: String,
    }]
    
});

mongoose.model('Buyer', BuyerSchema);
module.exports = mongoose.model('Buyer');