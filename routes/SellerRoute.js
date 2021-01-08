const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended:true}));

const Seller = require('../Models/Seller'); //Seller Schema

//ADD A SELLER TO THE SYSTEM
router.post('/register', (req, res) => {
    const newSeller = new Seller({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        firebaseUserId: req.body.firebaseUserId
    });
    //ADD SELLER
    newSeller.save()
    .then(user => {
        return res.status(201).json({
            message: "Seller added successfully",
            id: user._id
        });
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({
            error: error,
            message: "could not add seller"
        });
    });
});


//ADD A SELLER TO THE SYSTEM
router.post('/login', (req, res) => {
    //TODO check theuser's email if it exists
    //if Yes, return 200 ok and proceed,
    //if no, retuen 404 and cancel the login process

    const email = req.body.email;
    Seller.findOne({email: email})
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: "user is valid",
                    id: user._id
                });
            }
            else {
                res.status(409).json({
                    message: "invalid user"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});


//REMOVE A SELLER TO THE SYSTEM
router.delete('/:id', (req, res) => {
    const id  = req.params.id;

    //Find if seller with provided id exists
    Seller.findById({_id: req.params.id})
        .then( seller => {
            if (seller) {
                //PERFORM THE DELETE FUNCTION
                Seller.deleteOne({_id: req.params.id})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: "Seller deleted"
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    }); 
            }
            else {
                return res.status(404).json({
                    message: "Seller not found"
                });
            }
        })
});

//GET('/buyer')
//GET ALL BUYERS ROUTE
router.get('/', (req, res) => {
    try {
        Seller.find()
        .exec()
        .then(result => {
            if (result.length >= 1) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "No sellers found"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error,message
            });
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,message
        }); 
    }
    
});

//GET SINGLE SELLER DETAILS
router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;
        Seller.findById(id)
            .exec()
            .then(seller => {
                if (seller) {
                    res.status(200).json(seller);
                }
                else {
                    res.status(404).json({
                        message: "No seller found"
                    });
                }
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).json({
                    error: error.message
                });
            });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;