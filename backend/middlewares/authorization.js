const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user");
const wrapAsync = require("./wrapAsync");

const authorization = wrapAsync(async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(404).send({ message: "Token not found" });
	}
	const userId = getUserIdFromToken(token);
	if (userId) {
		req.user = await User.findById(userId).select("-password");
	}
	next();
});

module.exports = { authorization };
