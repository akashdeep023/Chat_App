import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getChatName, { getChatImage } from "../../utils/getChatName";
import { SimpleDateAndTime } from "../../utils/formateDateTime";
import { CiCircleInfo } from "react-icons/ci";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { addSelectedChat } from "../../redux/slices/myChatSlice";
import { setLoading } from "../../redux/slices/conditionSlice";

const Overview = () => {
	const dispatch = useDispatch();
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [changeNameBox, setChangeNameBox] = useState(false);
	const [changeName, setChangeName] = useState(selectedChat?.chatName);
	const handleShowNameChange = () => {
		if (authUserId === selectedChat?.groupAdmin?._id) {
			setChangeNameBox(!changeNameBox);
			setChangeName(selectedChat?.chatName);
		} else {
			toast.warn("You're not admin");
		}
	};
	const handleChangeName = () => {
		setChangeNameBox(false);
		if (selectedChat?.chatName === changeName.trim()) {
			toast.warn("Name already taken");
			return;
		} else if (!changeName.trim()) {
			toast.warn("Please enter group name");
			return;
		}
		dispatch(setLoading(true));
		const token = localStorage.getItem("token");
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/rename`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: changeName.trim(),
				chatId: selectedChat?._id,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(addSelectedChat(json?.data));
				dispatch(setLoading(false));
				toast.success("Group name changed");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				dispatch(setLoading(false));
			});
	};

	return (
		<div className="flex flex-col gap-2 text-white p-4">
			<div className="flex flex-col items-center justify-center gap-2 mb-3 mt-3">
				<img
					src={getChatImage(selectedChat, authUserId)}
					alt=""
					className="h-16 w-16 rounded-full"
				/>
				<div className="text-center leading-5 font-semibold text-lg flex items-center gap-1">
					<h1>{getChatName(selectedChat, authUserId)}</h1>
					{selectedChat?.isGroupChat && (
						<CiCircleInfo
							fontSize={15}
							title="Change Name"
							className="cursor-pointer"
							onClick={handleShowNameChange}
						/>
					)}
				</div>
			</div>
			{changeNameBox && (
				<>
					<h1>Rename Group Chat :</h1>
					<div className="flex gap-1">
						<input
							type="text"
							className="w-full border border-slate-600 py-1 px-2 font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
							value={changeName}
							onChange={(e) => setChangeName(e.target.value)}
						/>
						<div
							title="Change Name"
							className="border border-slate-600 p-2 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
							onClick={handleChangeName}
						>
							<RxUpdate fontSize={18} />
						</div>
					</div>
				</>
			)}
			<div className="min-h-0.5 w-full bg-slate-900/50"></div>
			<div className="text-sm mt-1">
				<h1>Created</h1>
				<h2 className="opacity-50">
					{SimpleDateAndTime(selectedChat?.createdAt)}
				</h2>
			</div>
			<div className="text-sm">
				<h1>Last Updated</h1>
				<h2 className="opacity-50">
					{SimpleDateAndTime(selectedChat?.updatedAt)}
				</h2>
			</div>
			<div className="text-sm">
				<h1>Last Message</h1>
				<h2 className="opacity-50">
					{SimpleDateAndTime(selectedChat?.latestMessage?.updatedAt)}
				</h2>
			</div>
		</div>
	);
};

export default Overview;
