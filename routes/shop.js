const express = require("express");

const shopController = require("../controllers/shop.controller");

const router  = express.Router();


//TODO: add middleware
router.get('/products',shopController.getAllProducts);
router.post('/buy', shopController.buyProduct);

module.exports = router;