const User = require("../models/user");
const { getUserIdFromToken } = require("../config/jwtProvider");

const getAuthUser = async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(404).send({ message: "token not found" });
	}
	const userId = getUserIdFromToken(token);
	let user = await User.findById(userId);
	if (!user) {
		return res.status(404).json({ message: `User Not Found` });
	}
	user.password = null;
	res.status(200).json({
		data: user,
	});
};

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();
		allUsers.forEach((user) => {
			user.password = null;
		});
		res.status(200).send({ data: allUsers });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports = { getAuthUser, getAllUsers };
