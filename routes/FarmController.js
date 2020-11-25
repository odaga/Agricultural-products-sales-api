const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('../config/db');

const checkAuth = require('../auth/check-auth.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Farm = require('../Models/Farm'); //Farm schema

//CREATE A NEW FARM DOCUMENT
//TODO: we may need to add routh protecting to this route 
// by adding the checkAuth middleware 
router.post('/', (req, res) => {
    const farm = new Farm ({
        _id: new mongoose.Types.ObjectId(),
        farmName: req.body.farmName,
        farmDescripton: req.body.farmDescripton,
        farmImageUrl: req.body.farmImageUrl,
        farmLocation: req.body.farmLocation,
        farmCrop: req.body.farmCrop,
        farmDuration: req.body.farmDuration,
        farmAmount: req.body.farmAmount,
        farmROI: req.body.farmROI,
        farmOwnerId: req.body.farmOwnerId
    });
    farm.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Farm Data saved",
                createdFarm: result
            });
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



//RETURN ALL FARMS IN THE DATABASE
router.get("/", (req, res) => {
    Farm.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length >= 1) {
                res.status(200).json(docs);
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


//GETS A SINLGE FARM DOCUMENT FROM THE DATABASE
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Farm.findById(id)
        .exec()
        .then (doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({err: err});
        })
});




//consider adding jwt route protection
// DELETES A FARM FROM THE DATABASE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Farm.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//UPDATE A FARM DOCUMENT IN THE DATABASE
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Farm.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;