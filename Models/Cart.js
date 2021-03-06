const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    productId: String,
    name: String,
    description: String,
    Stock: String,
    price: String,
    productCategory: String,
    productImage: String,
    approvalStatus: Boolean,
    ownerId: String,
    buyerId: String,
    numberOfCartItems: {
        type: Number,
        default: 0
    }

});

mongoose.model('Cart', CartSchema);
module.exports = mongoose.model('Cart');