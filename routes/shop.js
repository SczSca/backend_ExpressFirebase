const express = require("express");

const shopController = require("../controllers/shop.controller");
const userMiddleware = require("../middleware/user.middleware");

const router  = express.Router();


//TODO: add middleware
router.get('/products', userMiddleware.isLoggedIn , shopController.getAllProducts);
router.post('/buy', userMiddleware.isLoggedIn , shopController.buyProduct);

module.exports = router;