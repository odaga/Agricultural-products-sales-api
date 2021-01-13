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
            _id: new mongoose.Types.ObjectId(),
            productId: req.body.productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            productCategory: req.body.productCategory,
            productImage: req.body.productImage,
            ownerId: req.body.ownerId,
            buyerId: req.body.buyerId
        });

        Buyer.find()
                .where('firebaseUserId').equals(req.body.buyerId)
                .exec()
                .then(buyer => {
                    /*
                    buyer[0].cart.push(newCartItem);
                    buyer[0].save();
                    return res.status(201).json(buyer[0].cart);
                    */
                   //res.status(201).json(buyer[0].cart)
                   console.log(req.body)
                   res.status(201).json(req.body);
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
        Buyer.find()
            .where('firebaseUserId').equals(buyerId)
            .exec()
            .then(result => {
                
                
                if(result[0].cart.length >= 1) {
                    res.status(200).json(result[0].cart);
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

//CEARING THE CART AFTER CHECKOUT
router.get('/clear/:id', (req, res) => {
    try {
        Buyer.find()
        .where('firebaseUserId').equals(req.params.id)
        .exec()
        .then(result => {
            if(result[0].cart.length >= 1) {

                result[0].cart = [];
                result[0].save();
                res.status(200).json(result[0].cart.length);
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