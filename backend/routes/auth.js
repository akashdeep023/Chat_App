const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const wrapAsync = require("../middlewares/wrapAsync");

router.post("/signup", wrapAsync(authControllers.registerUser));
router.post("/signin", wrapAsync(authControllers.loginUser));

module.exports = router;
