const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.json({ message: "Welcome to Chat Application!" });
});

app.listen(9000, () => console.log("Server listening on 9000"));
