const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    Stock: String,
    unit: String,
    price: String,
    productCategory: String,
    productImage: String,
    approvalStatus: Boolean,
    ownerId: String,
    buyerId: String,
    views: {
        Type: Number,
        default: 0
    }

});

mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product');