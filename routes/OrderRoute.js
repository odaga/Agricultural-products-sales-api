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


//POST('/order')
router.post('/:id', (req, res) => {
    try {
        //getting seller id
        const id = req.params.id;

        Seller.findOne(id)
            .exec()
            .then(seller => {
                seller.Orders
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).json({
                    message: error.message
                })
            })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
});



module.exports = router;