const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//const User = require('../Models/User');
const User = require('../Models/User');

//CREATE A NEW USER
router.post('/', (req, res) => {
   const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    user = new User(data);
    user.save((err) => {
        if (err) {
            res.status(500).json({
                message: "Sorry, internal server error"
            });
        }
        else {
            res.status(201).json({
                message: "User created successfully"
            });
            console.log(data);
        }
    });
});

//RETURN ALL USERS IN THE DATABASE
router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if(err)
            return res.status(500).json({
                message: "There was a problem finding the users"
            });
        res.status(200).json(users);
    });
});

//GETS A SINLGE USER FROM THE DATABASE
router.get('/:id', (req, res) => {
    User.findOne(req.body.id, (err, user) => {
        if(err)
            return res.status(500).json({
                message: "There was a problwm finding the user"
            });
        if (!user)
            return res.status(404).json({
                message: "No user found"
            });
        res.status(200).json(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err)
        return res.status(500).send("There was a problem deleting the user");
    res.status(200).json({
        message: "User "+ user.name +" was deleted"
    });
    }); 
});

//UPDATES A SINGLE USER IN THE DATABSE
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err)
            return res.status(500).json({
                message: "There was a problem updating the user."
            });
        res.status(200).json(user);
    });
});

module.exports = router;