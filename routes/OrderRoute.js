const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const Product = require('../Models/Product'); //Product Schema

//POST('/order')
//ADD ORDER TO ORDER SUB-DOCUMENT IN THE SELLER SCHEMA

//CHECK ORDER STATUS FROM FROM PENDING TO COMFIRMED

//CHECK ORDER STATUS FROM FROM CONFIRMED TO DELIVERY IN PROGRESS.

//CHECK ORDER STATUS FROM DELIVERY IN PROGRESS TO DELIVERY THEN DELETE ORDER.




module.exports = router;