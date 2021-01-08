const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Buyer = require('../Models/Buyer'); //Buyer Schema

//POST('/buyer')
//ADD A BUYER TO THE SYSTEM
router.post('/register', (req, res) => {
    const newBuyer = new Buyer({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        firebaseUserId: req.body.firebaseUserId
    });
    //ADD NEW BUYER
    newBuyer.save()
        .then(buyer => {
            res.status(201).json({
                message: "user added successfully",
                buyer: buyer
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "could not add user",
                error: error.message
                
            });
        });
});


///POST('/buyer')
//submit buyer credentials for authentication
router.post('/login', (req, res) => {
    try {
        const email = req.body.email;
    Buyer.findOne({email: email})
        .exec()
        .then(buyer => {
            if (buyer) {
                res.status(200).json({
                    message: "user is valid",
                    id: buyer._id
                });
            }
            else {
                res.status(401).json({
                    message: "invalid user"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error.message
            });
        });
        
    } catch (error) {
        console.log(error);
            res.status(500).json({
                error: error.message
            });
    }
    
});

//GET('/buyer/id')
//GET SINGLE BUYER FROM THE DATABASE
router.get('/:id', (req, res) => {
    const id  = req.params.id;
    try {
        Buyer.findById(id)
        .exec()
        .then( buyer => {
            if (buyer) {
                return res.status(200).json(buyer);
            }
            else {
                return res.status(404).json({
                    message: "buyer with provided id not does not exist"
                });
            }
        })
        .catch(error => {
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

//GET ALL BUYERS
//GET('/BUYER')

router.get('/', (req, res) => {
    try {
        Buyer.find()
            .exec()
            .then(result => {
                if (result.length < 1)
                    return res.status(404).json({
                        message: "No buyers found"
                    });
                else
                return res.status(200).json(result);
                
            })
        
    } catch (error) {
        console.log(erro.message);
        res.status(500).json({error: error.message});
    }
});

//DELETE('/buyer/id')
//REMOVE A BUYER TO THE SYSTEM
router.delete('/:id', (req, res) => {
    try {
        const id  = req.params.id;
    Buyer.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.mesa
        });
    }
    const id  = req.params.id;
    Buyer.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//GET('/buyer')
//GET ALL BUYERS ROUTE
router.get('/', (req, res) => {
    Buyer.find()
        .exec()
        .then(buyers => {
            if (buyers.length >= 1) {
                res.status(200).json(buyers);
            }
            else {
                res.status(404).json({
                    message: "No buyers found"
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





module.exports = router;