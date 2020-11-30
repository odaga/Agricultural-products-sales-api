const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Product = require('../Models/Product'); //Product Schema


//ADDING A NEW PRODUCT TO THE DATABASE
router.post("/", (req, res) => {

    try {
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            productImage: req.body.productImage,
            approvalStatus: false,
            ownerId: req.body.ownerId
        });
    
        newProduct.save()
            .then(product => {
                res.status(201).json({
                    message: "Product information has been successfully submitted",
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

//RETRIEVING ALL THE PRODUCT FROM THE DATABASE
router.get("/", (req, res) => {
    try {
        Product.find()
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

//RETRIEVE ONE PRODUCT FROM THE DATABASE
router.get("/:id",(req, res) => {
    try {
        const id = req.params.id;
    Product.findById(id)
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


//RETRIEVE ONE PRODUCT FROM THE DATABASE
router.delete("/:id",(req, res) => {
    try {
        const id = req.params.id;

    Product.deleteOne({_id: id})
        exec()
        .then(result => {
            res.status(200).json({
                message: "Successfully deleted prodcut with id" + id
            });
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
    } catch (err) {
        console.log(err);
            res.status(500).json({
                error: err.message
            });
    }           

});

//RETRIEVE ONE PRODUCT CATEGORY FROM THE DATABASE
router.get("/:categoryId",(req, res) => {
    try {
        const category = req.params.categoryId;

    Product.find({productCategory: categoryId})
        .exec()
        .then(products => {
           if (products.length >= 0) {
            res.status(200).json(products);
           }
           else {
            res.status(404).json({
                message: "No products found under this category"
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
        console.log(err);
            res.status(500).json({
                error: err
            });
    }
});



//TODO consider adding a put route to help change the products approvealStatus from false to true

module.exports = router;
