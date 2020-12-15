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
    res.status(200).send(req.body);
});



//ADDING A NEW PRODUCT ORDER TO THE DATABASE
/*
router.post("/", (req, res) => {
    try {
        const newOrder = new Order({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice,
            productCategory: req.body.productCategory,
            productImage: req.body.productImageUrl,
            approvalStatus: false,
            ownerId: req.body.productOwnerId
        });
    
        newOrder.save()
            .then(product => {
                res.status(201).json({
                    message: "Product order submitted successfully",
                    newProduct: product
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error,message,
                    message: "could not submit product order"
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "internal server error"
        });
    }
});

*/



//RETRIEVE ONE FARMER'S  PRODUCT ORDERS FROM THE DATABASE
router.get("/:id",(req, res) => {
    try {
        const id = req.params.id;
    Order.findById(id)

        .where('ownerId').equals(id)
        .exec()
        .then(product => {
            if (product) {
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