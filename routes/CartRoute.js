const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


const Product = require('../Models/Product'); //Product Schema
const Seller = require('../Models/Seller'); //Seller Schema
const Order = require('../Models/Order'); //Order Schema
const Cart = require('../Models/Cart');


//ADD ORDER TO ORDER SUB-DOCUMENT IN THE SELLER SCHEMA
router.post('/', (req, res) => {
    try {
        const item = new Cart(
            _id = req.params.id,
            name = req.body.name,
            price = req.body.price,
            productImage = req.body.productImage,
            quantity = req.body.quantity,
            ownerId = req.body.ownerId,
            buyerId = req.body.buyerId
        );
        Cart.save(item)
            .then(item => {
                res.status(200).json({
                    message: "item added to cart successfully",
                });
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).json({
                    error: error.message
                });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        })
    }
});

//get single user's cart items
router.get('/:id', (req, res) => {
    try {
        const buyerId = req.params.id;
        Cart.find()
        .exec()
        .then(result => {
            if(result.length >= 1) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "Cart is empty"
                })
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