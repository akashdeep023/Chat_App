import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	setChatLoading,
	setLoading,
	setUserSearchBox,
} from "../../redux/slices/conditionSlice";
import { toast } from "react-toastify";
import ChatShimmer from "../loading/ChatShimmer";
import { addSelectedChat } from "../../redux/slices/myChatSlice";
import { SimpleDateAndTime } from "../../utils/formateDateTime";
import socket from "../../socket/socket";

const UserSearch = () => {
	const dispatch = useDispatch();
	const isChatLoading = useSelector(
		(store) => store?.condition?.isChatLoading
	);
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [inputUserName, setInputUserName] = useState("");
	const authUserId = useSelector((store) => store?.auth?._id);

	// All Users Api Call
	useEffect(() => {
		const getAllUsers = () => {
			dispatch(setChatLoading(true));
			const token = localStorage.getItem("token");
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/users`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					setUsers(json.data || []);
					setSelectedUsers(json.data || []);
					dispatch(setChatLoading(false));
				})
				.catch((err) => {
					console.log(err);
					dispatch(setChatLoading(false));
				});
		};
		getAllUsers();
	}, []);

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
				dispatch(addSelectedChat(json?.data));
				dispatch(setLoading(false));
				socket.emit("chat created", json?.data, authUserId);
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
			<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[73vh]">
				{selectedUsers.length == 0 && isChatLoading ? (
					<ChatShimmer />
				) : (
					<>
						{selectedUsers?.length === 0 && (
							<div className="w-full h-full flex justify-center items-center text-white">
								<h1 className="text-base font-semibold">
									No users registered.
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
												{SimpleDateAndTime(
													user?.createdAt
												)}
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
