const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI environment variable is not defined");
		}
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Database Connection established");
	} catch (err) {
		console.error("Database connection error:", err);
	}
};
module.exports = connectDb;
