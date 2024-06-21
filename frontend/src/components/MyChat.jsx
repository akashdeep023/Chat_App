import React, { useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";
import Group_Img from "../assets/group.png";
import { addMyChat } from "../redux/auth/myChatSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	setChatLoading,
	setGroupChatBox,
	setSelectedChat,
} from "../redux/auth/conditionSlice";
import ChatShimmer from "./loading/ChatShimmer";
import getChatName from "../utils/getChatName";
import { addChatName } from "../redux/auth/messageSlice";

const MyChat = () => {
	const dispatch = useDispatch();
	const myChat = useSelector((store) => store.myChat.chat);
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.condition?.selectedChat);
	const isChatLoading = useSelector(
		(store) => store?.condition?.isChatLoading
	);
	const newMessageId = useSelector((store) => store?.message?.newMessageId);
	// All My Chat Api Call
	useEffect(() => {
		const getMyChat = () => {
			dispatch(setChatLoading(true));
			const token = localStorage.getItem("token");
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					dispatch(addMyChat(json?.data || []));
					dispatch(setChatLoading(false));
				})
				.catch((err) => {
					console.log(err);
					dispatch(setChatLoading(false));
				});
		};
		getMyChat();
	}, [newMessageId]);
	return (
		<>
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
				<h1 className="mr-2 whitespace-nowrap">My Chat</h1>
				<div
					className="flex items-center gap-2 border border-slate-600 py-1 px-2 rounded-md cursor-pointer hover:bg-slate-600 active:bg-black/20"
					title="Create New Group"
					onClick={() => dispatch(setGroupChatBox())}
				>
					<h1 className="line-clamp-1 lin whitespace-nowrap w-full">
						New Group
					</h1>
					<FaPenAlt />
				</div>
			</div>
			<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[73vh]">
				{myChat.length == 0 && isChatLoading ? (
					<ChatShimmer />
				) : (
					<>
						{myChat?.length === 0 && (
							<div className="w-full h-full flex justify-center items-center text-white">
								<h1 className="text-base font-semibold">
									Start a new conversation.
								</h1>
							</div>
						)}
						{myChat?.map((chat) => {
							return (
								<div
									key={chat?._id}
									className={`w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/55 to-slate-800  via-slate-300  from-slate-800 transition-all cursor-pointer ${
										selectedChat == chat?._id
											? "bg-gradient-to-tr text-black"
											: "text-white"
									}`}
									onClick={() => {
										dispatch(setSelectedChat(chat?._id));
										dispatch(
											addChatName(
												getChatName(chat, authUserId)
											)
										);
									}}
								>
									<img
										className="h-12 min-w-12 rounded-full"
										src={
											authUserId == chat.users[0]._id
												? chat.users[1].image
												: chat.users[0].image
										}
										alt="img"
									/>
									<div className="w-full">
										<div className="flex justify-between items-center w-full">
											<span className="line-clamp-1 capitalize">
												{getChatName(chat, authUserId)}
											</span>
											<div className="line-clamp-1 ">
												<span className="text-xs font-light">
													{chat?.latestMessage &&
														new Date(
															chat?.latestMessage?.createdAt
														)
															.toDateString()
															.split(" ")
															.slice(1, 3)
															.join(" ")}
												</span>{" "}
												<span className="text-xs font-light">
													{chat?.latestMessage &&
														new Date(
															chat?.latestMessage?.createdAt
														)
															.toTimeString()
															.split(" ")[0]}
												</span>
											</div>
										</div>
										<span className="text-xs font-light line-clamp-1 ">
											{chat?.latestMessage ? (
												chat?.latestMessage?.message
											) : (
												<>
													<span className="text-xs font-light">
														{new Date(
															chat?.createdAt
														).toDateString()}
													</span>{" "}
													<span className="text-xs font-light">
														{
															new Date(
																chat?.createdAt
															)
																.toTimeString()
																.split(" ")[0]
														}
													</span>
												</>
											)}
										</span>
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};

export default MyChat;
