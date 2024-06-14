import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	setLoading,
	setSelectedChat,
	setUserSearchBox,
} from "../redux/auth/conditionSlice";
import { toast } from "react-toastify";
import ChatShimmer from "./loading/ChatShimmer";

const UserSearch = () => {
	const dispatch = useDispatch();
	const users = useSelector((store) => store.users.users);
	const isChatLoading = useSelector(
		(store) => store?.condition?.isChatLoading
	);
	const [selectedUsers, setSelectedUsers] = useState(users);
	const [inputUserName, setInputUserName] = useState("");
	useEffect(() => {
		setSelectedUsers(
			users.filter((user) => {
				return (
					user.firstName
						.toLowerCase()
						.includes(inputUserName?.toLowerCase()) ||
					user.lastName
						.toLowerCase()
						.includes(inputUserName?.toLowerCase()) ||
					user.email
						.toLowerCase()
						.includes(inputUserName?.toLowerCase())
				);
			})
		);
	}, [inputUserName]);
	const handleCreateChat = async (userId) => {
		dispatch(setLoading(true));
		const token = localStorage.getItem("token");
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				userId: userId,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(setSelectedChat(json.message?._id));
				dispatch(setLoading(false));
				toast.success("Created & Selected chat");
				dispatch(setUserSearchBox());
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				dispatch(setLoading(false));
			});
	};
	return (
		<>
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
				<h1 className="mr-2 whitespace-nowrap">New Chat</h1>
				<div className="w-2/3 flex flex-nowrap items-center gap-2">
					<input
						id="search"
						type="text"
						placeholder="Search Users..."
						className="w-full border border-slate-600 py-1 px-2 font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
						onChange={(e) => setInputUserName(e.target?.value)}
					/>
					<label htmlFor="search" className="cursor-pointer">
						<FaSearch title="Search Users" />
					</label>
				</div>
			</div>
			<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[73vh]">
				{selectedUsers.length == 0 && isChatLoading ? (
					<ChatShimmer />
				) : (
					<>
						{selectedUsers?.length === 0 && (
							<div className="w-full h-full flex justify-center items-center text-white">
								<h1 className="text-base font-semibold">
									No Users Found
								</h1>
							</div>
						)}
						{selectedUsers?.map((user) => {
							return (
								<div
									key={user?._id}
									className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
									onClick={() => handleCreateChat(user._id)}
								>
									<img
										className="h-12 min-w-12 rounded-full"
										src={user?.image}
										alt="img"
									/>
									<div className="w-full">
										<span className="line-clamp-1 capitalize">
											{user?.firstName} {user?.lastName}
										</span>
										<div>
											<span className="text-xs font-light">
												{
													user?.createdAt &&
														new Date(
															user?.createdAt
														).toDateString()
													// .split(" ")[0]
												}
											</span>{" "}
											<span className="text-xs font-light">
												{user?.createdAt &&
													new Date(user?.createdAt)
														.toTimeString()
														.split(" ")[0]}
											</span>
										</div>
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

export default UserSearch;
