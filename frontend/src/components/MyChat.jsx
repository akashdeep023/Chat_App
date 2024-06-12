import React, { useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";
import Group_Img from "../assets/group.png";
import { addMyChat } from "../redux/auth/myChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../redux/auth/conditionSlice";

const MyChat = () => {
	const dispatch = useDispatch();
	const myChat = useSelector((store) => store.myChat.chat);
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.condition?.selectedChat);
	// All My Chat Api Call
	useEffect(() => {
		const getMyChat = () => {
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
					dispatch(addMyChat(json.message));
				})
				.catch((err) => console.log(err));
		};
		getMyChat();
	}, []);
	return (
		<>
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
				<h1 className="mr-2 whitespace-nowrap">My Chat</h1>
				<div className="flex items-center gap-2 border border-slate-600 py-1 px-2 rounded-md cursor-pointer hover:bg-slate-600 active:bg-black/20">
					<h1 className="line-clamp-1 lin whitespace-nowrap w-full">
						New Group
					</h1>
					<FaPenAlt />
				</div>
			</div>
			<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[73vh]">
				{myChat &&
					myChat?.map((chat) => {
						return (
							<div
								key={chat?._id}
								className={`w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/55 to-slate-800  via-slate-300  from-slate-800 transition-all cursor-pointer ${
									selectedChat == chat?._id
										? "bg-gradient-to-tr text-black"
										: "text-white"
								}`}
								onClick={() =>
									dispatch(setSelectedChat(chat?._id))
								}
							>
								<img
									className="h-12 w-12 rounded-full"
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
											{chat?.chatName == "Messenger"
												? authUserId ==
												  chat.users[0]._id
													? chat.users[1].firstName +
													  " " +
													  chat.users[1].lastName
													: chat.users[0].firstName +
													  " " +
													  chat.users[0].lastName
												: chat?.chatName}
										</span>
										<div>
											<span className="text-xs font-light">
												{chat?.latestMessage &&
													new Date(
														chat?.latestMessage?.createdAt
													)
														.toDateString()
														.split(" ")[0]}
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
									<span className="text-xs font-light">
										{chat?.latestMessage?.message}
									</span>{" "}
								</div>
								<span className="font-light text-xs"></span>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default MyChat;
