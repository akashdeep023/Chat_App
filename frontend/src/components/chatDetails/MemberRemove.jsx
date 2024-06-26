import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	IoCheckmarkCircleOutline,
	IoPersonAddOutline,
	IoPersonRemoveOutline,
} from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { CiCircleInfo } from "react-icons/ci";
import { toast } from "react-toastify";
import { addSelectedChat } from "../../redux/slices/myChatSlice";
import { setLoading } from "../../redux/slices/conditionSlice";

const MemberRemove = ({ setMemberAddBox }) => {
	const dispatch = useDispatch();
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [removeUserName, setRemoveUserName] = useState("");
	const [removeUserId, setRemoveUserId] = useState("");

	const handleRemoveUser = (userId, userName) => {
		setRemoveUserId(userId);
		setRemoveUserName(userName);
	};

	const handleRemoveUserCall = () => {
		dispatch(setLoading(true));
		const token = localStorage.getItem("token");
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/groupremove`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				userId: removeUserId,
				chatId: selectedChat?._id,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				toast.success(`${removeUserName} removed successfully`);
				setRemoveUserId("");
				setRemoveUserName("");
				dispatch(addSelectedChat(json?.data));
				dispatch(setLoading(false));
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				dispatch(setLoading(false));
			});
	};

	return (
		<div className="p-2">
			{selectedChat?.groupAdmin?._id === authUserId && (
				<div
					className="w-full my-2 h-12 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
					onClick={() => setMemberAddBox(true)}
				>
					<div className="h-10 min-w-10 rounded-full flex items-center justify-center border border-white/80">
						<IoPersonAddOutline fontSize={18} />
					</div>
					<span className="w-full line-clamp-1 capitalize">
						Add members
					</span>
				</div>
			)}
			<div className="min-h-0.5 w-full bg-slate-900/50"></div>
			<div className="flex flex-col items-start w-full justify-center gap-1 mb-3 mt-3">
				{selectedChat?.users?.map((user) => {
					return (
						<div
							key={user?._id}
							className="w-full h-12 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 transition-all cursor-pointer text-white"
						>
							<img
								className="h-10 min-w-10 rounded-full"
								src={user?.image}
								alt="img"
							/>
							<div className="w-full relative">
								<span className="line-clamp-1 capitalize">
									{user?.firstName} {user?.lastName}
								</span>
								{user?._id ===
									selectedChat?.groupAdmin?._id && (
									<span className="font-light text-xs text-blue-200">
										Admin
									</span>
								)}
							</div>
							{user?._id !== selectedChat?.groupAdmin?._id && (
								<>
									{selectedChat?.groupAdmin?._id ===
									authUserId ? (
										<div
											title="Remove User"
											className="border border-slate-600 p-2 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20 hover:bg-black/50"
											onClick={() =>
												handleRemoveUser(
													user?._id,
													user?.firstName
												)
											}
										>
											<IoPersonRemoveOutline />
										</div>
									) : (
										<CiCircleInfo
											onClick={() =>
												toast.warn("You're not admin")
											}
											fontSize={25}
											title="Not Allowed"
											className="cursor-pointer"
										/>
									)}
								</>
							)}
						</div>
					);
				})}
			</div>
			{removeUserName && (
				<>
					<div className="w-full min-h-10 p-2"></div>
					<div className="px-2 w-full fixed bottom-1 right-0">
						<div className="w-full h-12 border-slate-500 bg-blue-950 border rounded-lg flex justify-between items-center p-2 font-semibold gap-2 transition-all cursor-pointer text-white ">
							<h1 className="line-clamp-1">
								Confirm removal of '{removeUserName}'?
							</h1>
							<div className="flex gap-1">
								<div
									onClick={() => {
										setRemoveUserName("");
										setRemoveUserId("");
									}}
									className="border border-slate-600 p-1.5 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
								>
									<VscError fontSize={19} />
								</div>
								<div
									onClick={() => handleRemoveUserCall()}
									className="border border-slate-600 p-1.5 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
								>
									<IoCheckmarkCircleOutline fontSize={19} />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MemberRemove;
