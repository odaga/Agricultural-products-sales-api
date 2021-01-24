const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    stock: Number,
    unit: String,
    price: String,
    productCategory: String,
    productImage: String,
    approvalStatus: Boolean,
    ownerId: String,
    buyerId: String
    

});

mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product');