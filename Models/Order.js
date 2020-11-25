const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    SellerId: String,
    BuyerId: String
});

mongoose.model('Order', OrderSchema);
module.exports = mongoose.model('Order');