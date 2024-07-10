import React, { useEffect } from "react";
import { MdChat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UserSearch from "../components/chatComponents/UserSearch";
import MyChat from "../components/chatComponents/MyChat";
import MessageBox from "../components/messageComponents/MessageBox";
import ChatNotSelected from "../components/chatComponents/ChatNotSelected";
import {
	setSocketConnected,
	setUserSearchBox,
} from "../redux/slices/conditionSlice";
import socket from "../socket/socket";
import { addNewMessage } from "../redux/slices/messageSlice";
import { addNewMessageRecieved } from "../redux/slices/myChatSlice";
let selectedChatCompare;

const Home = () => {
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const dispatch = useDispatch();
	const isUserSearchBox = useSelector(
		(store) => store?.condition?.isUserSearchBox
	);
	const authUserId = useSelector((store) => store?.auth?._id);

	// socket connection
	useEffect(() => {
		if (!authUserId) return;
		socket.emit("setup", authUserId);
		socket.on("connected", () => dispatch(setSocketConnected(true)));
	}, [authUserId]);

	// socket message received
	useEffect(() => {
		selectedChatCompare = selectedChat;
		const messageHandler = (newMessageReceived) => {
			if (selectedChatCompare._id === newMessageReceived.chat._id) {
				dispatch(addNewMessage(newMessageReceived));
			} else {
				dispatch(addNewMessageRecieved(newMessageReceived));
			}
		};
		socket.on("message received", messageHandler);

		return () => {
			socket.off("message received", messageHandler);
		};
	});

	return (
		<div className="flex w-full border-slate-500 border rounded-sm shadow-md shadow-black relative">
			<div
				className={`${
					selectedChat && "hidden"
				} sm:block sm:w-[40%] w-full h-[80vh] bg-black/40 border-r border-slate-500 relative`}
			>
				<div className="absolute bottom-3 right-6 cursor-pointer text-white">
					<MdChat
						title="New Chat"
						fontSize={32}
						onClick={() => dispatch(setUserSearchBox())}
					/>
				</div>
				{isUserSearchBox ? <UserSearch /> : <MyChat />}
			</div>
			<div
				className={`${
					!selectedChat && "hidden"
				} sm:block sm:w-[60%] w-full h-[80vh] bg-black/40 relative overflow-hidden`}
			>
				{selectedChat ? (
					<MessageBox chatId={selectedChat?._id} />
				) : (
					<ChatNotSelected />
				)}
			</div>
		</div>
	);
};

export default Home;
