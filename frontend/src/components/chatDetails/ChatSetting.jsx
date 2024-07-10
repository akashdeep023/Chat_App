import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatSetting = () => {
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [isConfirm, setConfirm] = useState("");
	const handleClearChat = () => {
		if (
			authUserId === selectedChat?.groupAdmin?._id ||
			!selectedChat?.isGroupChat
		) {
			setConfirm("clear-chat");
		} else {
			toast.warn("You're not admin");
		}
	};
	const handleDeleteGroup = () => {
		if (authUserId === selectedChat?.groupAdmin?._id) {
			setConfirm("delete-group");
		} else {
			toast.warn("You're not admin");
		}
	};
	const handleDeleteChat = () => {
		if (!selectedChat?.isGroupChat) {
			setConfirm("delete-chat");
		}
	};

	//  handle Clear Chat Call
	const handleClearChatCall = () => {
		console.log("Clear Chat Call");
		toast.warn("Coming soon");
		setConfirm("");
		// -----------------------------------
	};
	// handle Delete Chat Call
	const handleDeleteChatCall = () => {
		console.log("Delete Chat Call");
		toast.warn("Coming soon");
		setConfirm("");
		// -----------------------------------
	};

	return (
		<div className="flex flex-col p-2 gap-2 text-white relative h-full z-10 overflow-auto scroll-style">
			<h1 className="font-semibold text-lg w-full text-center my-2">
				Setting
			</h1>
			<div
				onClick={handleClearChat}
				className="w-full h-8 border-slate-500 border text-sm rounded-lg flex justify-between items-center p-2 font-normal gap-2 transition-all cursor-pointer text-white"
			>
				<h1>Clear Chat</h1>
				<CiCircleInfo
					fontSize={15}
					title={
						selectedChat?.isGroupChat
							? "Admin access only"
							: "Clear Chat"
					}
					className="cursor-pointer"
				/>
			</div>
			{selectedChat?.isGroupChat ? (
				<div
					onClick={handleDeleteGroup}
					className="w-full h-8 border-slate-500 border text-sm rounded-lg flex justify-between items-center p-2 font-normal gap-2 transition-all cursor-pointer text-white"
				>
					<h1>Delete Group</h1>
					<CiCircleInfo
						fontSize={15}
						title="Admin access only"
						className="cursor-pointer"
					/>
				</div>
			) : (
				<div
					onClick={handleDeleteChat}
					className="w-full h-8 border-slate-500 border text-sm rounded-lg flex justify-between items-center p-2 font-normal gap-2 transition-all cursor-pointer text-white"
				>
					<h1>Delete Chat</h1>
					<CiCircleInfo
						fontSize={15}
						title="Delete Chat"
						className="cursor-pointer"
					/>
				</div>
			)}
			{isConfirm && (
				<div className="px-2 w-full fixed bottom-1 right-0">
					<div
						className={`w-full h-12 border-slate-500 ${
							isConfirm === "clear-chat"
								? "bg-blue-950"
								: "bg-red-950"
						}  border rounded-lg flex justify-between items-center p-2 font-semibold gap-2 transition-all cursor-pointer text-white `}
					>
						<h1>
							{isConfirm === "clear-chat"
								? "Clear chat confirmation?"
								: isConfirm === "delete-group"
								? "Delete group confirmation?"
								: "Delete chat confirmation"}
						</h1>
						<div className="flex gap-1">
							<div
								onClick={() => {
									setConfirm("");
								}}
								className="border border-slate-600 p-1.5 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
							>
								<VscError fontSize={19} />
							</div>
							<div
								onClick={
									isConfirm === "clear-chat"
										? handleClearChatCall
										: handleDeleteChatCall
								}
								className="border border-slate-600 p-1.5 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
							>
								<IoCheckmarkCircleOutline fontSize={19} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatSetting;
