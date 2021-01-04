const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        Type: integer,
        default: 0
    }

});

mongoose.model('Cart', CartSchema);
module.exports = mongoose.model('Cart');