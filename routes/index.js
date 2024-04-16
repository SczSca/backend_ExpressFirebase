// const userMiddleware = require("../middleware/user.middleware.js");
// const viewController = require("../controllers/view.controllers.js");

const adminRoute = require("./admin/admin.js");
const usuarioRoute = require("./user/user.js");
const shopRoute = require("./shop.js");

const express = require("express"); //express package
const router = express.Router();


router.use(express.json());



// how 2 use router
router.use('/admin', adminRoute);
// router.use('/user', usuarioRoute);
router.use('/shop', shopRoute);
module.exports = router;