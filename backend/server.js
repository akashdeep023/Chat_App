const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// const connectDb = require("./config/db");
const PORT = process.env.PORT || 3000;

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
connectDb();

// Use the CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Welcome to Chat Application!" });
});

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

app.all("*", (req, res) => {
	res.json({ error: "Invalid Route" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: "Something Went Worng!" });
});

app.listen(PORT, async () => {
	// await connectDb();
	console.log(`Server listening on ${PORT}`);
});
