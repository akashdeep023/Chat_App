import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import {
	setChatMenuBtn,
	setMessageLoading,
	setSelectedChat,
} from "../redux/auth/conditionSlice";
import { useDispatch, useSelector } from "react-redux";
import AllMessages from "./AllMessages";
import MessageSend from "./MessageSend";
import { addAllMessages } from "../redux/auth/messageSlice";
import MessageLoading from "./loading/MessageLoading";

const MessageBox = ({ chatId }) => {
	const dispatch = useDispatch();
	const isChatMenuBtn = useSelector(
		(store) => store?.condition?.isChatMenuBtn
	);
	const isMessageLoading = useSelector(
		(store) => store?.condition?.isMessageLoading
	);

	const allMessage = useSelector((store) => store?.message?.message);
	const newMessageId = useSelector((store) => store?.message?.newMessageId);

	// Handle Chat Box Scroll Down 1st Time
	useEffect(() => {
		const getMessage = (chatId) => {
			dispatch(setMessageLoading(true));
			const token = localStorage.getItem("token");
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/message/${chatId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					dispatch(addAllMessages(json?.data || []));
					dispatch(setMessageLoading(false));
				})
				.catch((err) => {
					console.log(err);
					dispatch(setMessageLoading(false));
				});
		};
		getMessage(chatId);
	}, [chatId, newMessageId]);
	return (
		<>
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white">
				<div className="flex items-center gap-3">
					<div className="sm:hidden bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center cursor-pointer">
						<FaArrowLeft
							title="Back"
							fontSize={14}
							onClick={() => dispatch(setSelectedChat(""))}
						/>
					</div>
					<h1>Tech Group</h1>
				</div>
				<FaEllipsisV
					title="Menu"
					className="cursor-pointer"
					onClick={() => dispatch(setChatMenuBtn(true))}
				/>
			</div>
			{isChatMenuBtn && (
				<div className="pt-4 border border-slate-500 text-white w-40 h-32 py-2 flex flex-col justify-center rounded-md items-center gap-1 absolute top-2 right-3 z-40 bg-slate-700">
					<div className="bg-black/15 hover:bg-black/50 h-6 w-6 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer">
						<MdOutlineClose
							title="Close"
							size={20}
							onClick={() => dispatch(setChatMenuBtn(false))}
						/>
					</div>
					<div className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-slate-400 hover:text-black p-1">
						Setting
					</div>
					<div className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-slate-400 hover:text-black p-1">
						Clear Chat
					</div>
				</div>
			)}
			{isMessageLoading ? (
				<MessageLoading />
			) : (
				<AllMessages allMessage={allMessage} />
			)}
			<MessageSend chatId={chatId} />
		</>
	);
};

export default MessageBox;
