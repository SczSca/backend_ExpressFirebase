const express = require("express");

// const adminMiddleware = require("../middleware/admin.middleware.js");
// const userMiddleware = require("../middleware/user.middleware.js");
// const adminController = require("../controllers/admin.controllers.js");
const shopController = require("../../controllers/shop.controller");

const router  = express.Router();

router.get('/',shopController.getAllProducts);
router.post('/product', shopController.newProduct);

module.exports = router; 