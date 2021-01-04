const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: String,
    productCategory: String,
    productImage: String,
    approvalStatus: Boolean,
    ownerId: String,
    buyerId: String,
    NumberOfOrders: {
        type: Number,
        default: 0
    }
});

mongoose.model('Order', OrderSchema);
module.exports = mongoose.model('Order');