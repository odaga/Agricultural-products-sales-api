const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Cart = require('../Models/Cart');



//ADDING A NEW PRODUCT TO THE DATABASE
router.post("/", (req, res) => {
    try {
        const newProduct = new Cart({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            price: req.body.productPrice,
            productCategory: req.body.productCategory,
            productImage: req.body.productImage,
            approvalStatus: false,
            ownerId: req.body.ownerId,
            buyerId: req.body.buyerId
        });
    
        newProduct.save()
            .then(product => {
                res.status(201).json({
                    message: "Product information has been successfully added to cart",
                    newProduct: product
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error,message,
                    message: "could not submit product information"
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "internal server error"
        });
    }

});



//get single user's cart items
router.get('/:id', (req, res) => {
    try {
        const buyerId = req.params.id;
        Cart.find()
        .where('buyerId').equals(buyerId)
        .exec()
        .then(result => {
            if(result.length > 0) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "empty cart"
                });
            }
        })
           .catch (error => {
            console.log(error.message);
        res.status(500).json({
            error: error.message
        })
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;