const express = require("express");
const router = express.Router();

const userAuthController = require("../controllers/userAuthController");

router.post("/signup", userAuthController.userSignup);
router.post("/login", userAuthController.userLogin);

module.exports = router;