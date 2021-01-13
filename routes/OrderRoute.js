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
const { insertMany, find } = require('../Models/Product');
const { TokenExpiredError } = require('jsonwebtoken');


//GET('/order')
//RETRIEVING ALL SINGLE SELLER ORDERS
router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;
        Seller.find()
            .where('firebaseUserId').equals(id)
            .exec()
            .then(seller => {
                
                if (seller[0].orders) {
                   return res.status(200).json(seller[0].orders)
                }
                else
                    return res.status(409).json({message: "No Seller found"})
                

                //res.status(200).json(seller[0].orders);
            })
            .catch(error => {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            });
        
    } catch (error) {
        console.log(error);
            res.status(500).json({
                error: error.message
            });
    }   
});


//ADD PRODUCTS TO ORDER SUB SCHEMA
router.post('/', (req, res) => {
    try {
        const id = req.body[0].ownerId;
        const orderList = req.body;

        Seller.find()
            .where('firebaseUserId').equals(id)
            .then(seller => {
                
                for (var i = 0; i <= orderList.length-1; i++) {
                     seller[0].orders.push(orderList[i]);
                     
                }
                seller[0].save();
                console.log(seller[0].orders)
                res.status(201).json(seller[0].orders);
            })
            .catch(error => {
                console.log(error.message);
                return res.status(500).json({
                    error: error.message
                });
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message
        });
    }
});

//Confirm order and deduct stock quantity


//post and order list
/*
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
*/



module.exports = router;