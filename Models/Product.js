const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    Stock: String,
    price: String,
    productCategory: String,
    productImage: String,
    approvalStatus: Boolean,
    ownerId: String,

});

mongoose.model('Product', FarmSchema);
module.exports = mongoose.model('Product');