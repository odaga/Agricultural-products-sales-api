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
const { insertMany } = require('../Models/Product');


//POST('/order')
//RETRIEVING ALL THE PRODUCT FROM THE DATABASE
router.get("/", (req, res) => {
    try {
        Order.find()
        .exec()
        .then(products => {
            console.log(products);
            if (products.length >= 1) {
                res.status(200).json(products);
            }
            else {
                res.status(404).json({
                    message: "No products were found"
                });
            }
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } catch (error) {
        console.log(error);
            res.status(500).json({
                error: error.message
            });
    }   
});

//post and order listen
router.post("/", (req, res) => {
    
    const orderList = req.body;

    Order.insertMany(orderList)
    .then(() =>{
        res.status(200).json({
            message: "orders placed"
        })
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        })
    })
});




//RETRIEVE ONE FARMER'S  PRODUCT ORDERS FROM THE DATABASE
router.get("/:id",(req, res) => {
    try {
        const id = req.params.id;
    Order.find()
        .where('ownerId').equals(id)
        .exec()
        .then(product => {
            if (product.length) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({
                    message: "No product found"
                });
            }
        })
        .catch (error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });

    } catch (error) {
        console.log(error);
            res.status(500).json({
                error: error
            });
    }
});






module.exports = router;