const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
	connectDb();
	console.log(`Server listening on ${PORT}`);
});
