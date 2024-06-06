const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const wrapAsync = require("../middlewares/wrapAsync");

router.get("/profile", wrapAsync(userControllers.getAuthUser));
router.get("/users", wrapAsync(userControllers.getAllUsers));

module.exports = router;
