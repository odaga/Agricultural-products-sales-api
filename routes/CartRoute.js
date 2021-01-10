const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Cart = require('../Models/Cart');
const Buyer = require('../Models/Buyer');



//ADDING A NEW PRODUCT TO THE BUYER CART
router.post("/", (req, res) => {
    try {
        const newCartItem = new Cart({
            productId: req.body.productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            productCategory: req.body.productCategory,
            productImage: req.body.productImage,
            approvalStatus: false,
            ownerId: req.body.ownerId,
            buyerId: req.body.buyerId
        });

        Buyer.findById(req.body.ownerId)
               // .where(_id).equals(req.body.buyerId)
                .exec()
                .then(buyer => {
                    buyer.cart.push(newCartItem);
                    buyer.save();
                    return res.status(201).json(buyer.cart.length);
                })
                .catch(error => {
                    console.log(error.message);
                });
    
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: error.message
        });
    }

});


//get single user's cart items
router.get('/:id', (req, res) => {
    try {
        const buyerId = req.params.id;
        Buyer.findById(buyerId)
        //.where('buyerId').equals(buyerId)
        .exec()
        .then(result => {
            //res.status(200).json(buyerId);
            
            if(result.cart.length >= 1) {
                res.status(200).json(result.cart);
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


//GET SINGLE CART ITEM
//cart/id
router.get('/item/:id', (req, res) => {
    try {
        const cardItemId = req.params.id;
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;