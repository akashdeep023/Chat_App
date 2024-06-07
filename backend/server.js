const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

// Use the CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
// Connect to Database
main()
	.then(() => console.log("Database Connection established"))
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.MONGODB_URI);
}

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
	console.log(`Server listening on ${PORT}`);
});
