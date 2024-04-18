const express = require("express");

const adminMiddleware = require("../../middleware/admin.middleware.js");
// const userMiddleware = require("../middleware/user.middleware.js");
// const adminController = require("../controllers/admin.controllers.js");
const shopController = require("../../controllers/shop.controller");

const router  = express.Router();

router.get('/', adminMiddleware.isAdminLoggedIn , shopController.getAllProducts);
//TODO: add middleware
router.post('/product', adminMiddleware.isAdminLoggedIn , shopController.newProduct);

module.exports = router; 