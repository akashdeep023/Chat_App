const Chat = require("../models/chat");
const Message = require("../models/message");

const createMessage = async () => {
	const { message, chatId } = req.body;
	if (message) {
		const newMessage = await Message.create({
			sender: currUserId,
			message: message,
			chat: chatId,
		});
		const chat = await Chat.findByIdAndUpdate(chatId, {
			latestMessage: message._id,
		});
		const fullMessage = await Message.findById(newMessage._id)
			.populate("sender", "-password")
			.populate("chat", { path: "users", select: "-password" });
		return res.status(201).json(fullMessage);
	} else {
		return res.status(400).json({ error: "Message not provide" });
	}
};

const allMessage = async (req, res) => {
	const chatId = req.params.chatId;
	const messages = await Message.find({ chat: chatId })
		.populate("sender", "-password")
		.populate("chat");
	return res.status(200).json({ messages: messages });
};

module.exports = { createMessage, allMessage };
