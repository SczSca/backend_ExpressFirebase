const express = require("express");

const shopController = require("../controllers/shop.controller");

const router  = express.Router();


//TODO: add middleware
router.get('/products',shopController.getAllProducts);

module.exports = router;