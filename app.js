const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');


//Database connection
try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION_URL, 
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, 
    () => {
      console.log("Connected to the DB");
  });
}
catch (err) {
  console.log("Could not connect to the DB");
}

const ProductRoute = require('./routes/ProductRoute');
const SellerRoute = require('./routes/SellerRoute');
const BuyerRoute = require('./routes/buyerRoute');
const CartRoute = require('./routes/CartRoute');
const OrderRoute = require('./routes/OrderRoute');


//ADDING THE NEEDED MIDDLEWARE
app.use(morgan('dev'));
app.use('/products', ProductRoute);
app.use('/seller', SellerRoute);
app.use('/buyer', BuyerRoute);
app.use('/cart', CartRoute);
app.use('/orders', OrderRoute);


//Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API root welcome to the agricultural product sales api',
        version: "1.0"
    });
});

module.exports = app;