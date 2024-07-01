const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// All routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.all("*", (req, res) => {
    res.json({ error: "Invalid Route" });
});

app.use((err, req, res, next) => {
    const errorMessage = err.message || "Something Went Wrong!";
    res.status(500).json({ message: errorMessage });
});

const server = app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
});

const { Server } = require("socket.io");

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Connection to socket.io");
    console.log(socket.id);
    // console.log("New user connected");

    // socket.on("join", ({ chatId, userId }) => {
    //     socket.join(chatId);
    //     console.log(`User ${userId} joined chat ${chatId}`);
    // });

    // socket.on("sendMessage", (message) => {
    //     io.to(message.chatId).emit("newMessage", message);
    // });

    // socket.on("disconnect", () => {
    //     console.log("User disconnected");
    // });
});
