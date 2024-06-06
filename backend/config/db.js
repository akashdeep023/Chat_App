const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		if (!process.env.ATLASDB_URL) {
			throw new Error("ATLASDB_URL environment variable is not defined");
		}
		await mongoose.connect(process.env.ATLASDB_URL);
		console.log("Database Connection established");
	} catch (err) {
		console.error("Database connection error:", err);
	}
};
module.exports = connectDb;
