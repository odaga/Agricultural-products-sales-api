const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = require('../auth/check-auth.js');

//const User = require('../Models/UserModel');
const User = require('../Models/User');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());




//SIGN UP USER
router.post('/signup', (req, res) => {
    //Check if the user with this email already exists
    User.find({email: req.body.email})
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    res.status(409).json({
                        message: "user with this email already exists"
                    });
                }
                else {
                    //Encrypting the password with a salt 10 times
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hash,
                profile_image_url: req.body.profile_image_url
            });
            user.save()
                .then(result => {
                    //console.log(result);
                    return res.status(201).json({
                        message: 'user created'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
    }
});
   
});

//LOGGING ALREADY EXISTING USERS
router.post('/login', (req, res) => {
    User .find({ email: req.body.email})
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                //Check for the password
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        // Sending token with JWT
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                        );
                        
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
});



//DELETE USER ACCOUNT FROM THE DATABASE
router.delete('/:userId', checkAuth, (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'User deleted'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
});


//RETURNS ALL USERS IN THE DATABASE
router.get("/users", (req, res) => {
    User.find()
        .exec()
        .then(users => {
            console.log(users);
            if(users.length >= 0) {
                res.status(200).json(users);
            }
            else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//RETURN ALL USERS IN THE DATABASE
router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .exec()
        .then (doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    massage: "No valid entry found for provided ID"
                });
            }
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({err: err});
        })
});

module.exports = router;