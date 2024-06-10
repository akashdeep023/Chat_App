const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync");
const { authorization } = require("../middlewares/authorization");
const chatController = require("../controllers/chat");

router.post("/", authorization, wrapAsync(chatController.postChat));
router.get("/", authorization, wrapAsync(chatController.getChat));

router.get("/group", authorization, wrapAsync(chatController.createGroup));
router.get("/rename", authorization, wrapAsync(chatController.renameGroup));
router.get(
	"/groupremove",
	authorization,
	wrapAsync(chatController.removeFromGroup)
);
router.get("/groupadd", authorization, wrapAsync(chatController.addToGroup));

module.exports = router;
