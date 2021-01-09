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
        name: String,
        description: String,
        unit: String,
        price: Number,
        quantity: Number,
        productCategory: String,
        productImage: String,
        approvalStatus: Boolean,
        ownerId: String,
        ownerPhoneNumber: String,
    }]
    
});

mongoose.model('Buyer', BuyerSchema);
module.exports = mongoose.model('Buyer');