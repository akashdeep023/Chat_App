import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSelectedChat } from "../../redux/slices/myChatSlice";
import { setChatLoading, setLoading } from "../../redux/slices/conditionSlice";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { ChatShimmerSmall } from "../loading/ChatShimmer";
import { IoCheckmarkCircleOutline, IoPersonAddOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";

const MemberAdd = ({ setMemberAddBox }) => {
	const dispatch = useDispatch();
	const isChatLoading = useSelector(
		(store) => store?.condition?.isChatLoading
	);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [inputUserName, setInputUserName] = useState("");
	const [addUserName, setAddUserName] = useState("");
	const [addUserId, setAddUserId] = useState("");
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
	const handleAddUser = (userId, userName) => {
		if (selectedChat?.users?.find((user) => user?._id === userId)) {
			toast.warn(`${userName} is already added`);
			setAddUserId("");
			setAddUserName("");

			return;
		}
		setAddUserId(userId);
		setAddUserName(userName);
	};

	const handleAddUserCall = () => {
		dispatch(setLoading(true));
		const token = localStorage.getItem("token");
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/groupadd`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				userId: addUserId,
				chatId: selectedChat?._id,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				toast.success(`${addUserName} Added successfully`);
				setAddUserId("");
				setAddUserName("");
				dispatch(addSelectedChat(json?.data));
				dispatch(setLoading(false));
				setMemberAddBox(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
				dispatch(setLoading(false));
			});
	};

	return (
		<div className="p-2">
			<div className="font-normal text-base w-full text-center mb-2">
				Total Users ( {users?.length || 0} )
			</div>
			<div className="min-h-0.5 w-full bg-slate-900/50 mb-2"></div>
			<div
				onClick={() => setMemberAddBox(false)}
				className="bg-black/15 hover:bg-black/50 h-8 w-8 rounded-md flex items-center justify-center absolute top-4 left-3 cursor-pointer"
			>
				<FaArrowLeft title="Back" fontSize={14} />
			</div>
			<div className="w-full flex flex-nowrap items-center justify-center gap-2 mb-2">
				<input
					id="search"
					type="text"
					placeholder="Search Users..."
					className="w-2/3 border border-slate-600 py-1 px-2 font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
					onChange={(e) => setInputUserName(e.target?.value)}
				/>
				<label htmlFor="search" className="cursor-pointer">
					<FaSearch title="Search Users" />
				</label>
			</div>
			<div className="flex flex-col items-start w-full justify-center gap-1 mb-3 mt-3">
				{selectedUsers.length == 0 && isChatLoading ? (
					<ChatShimmerSmall />
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
									className="w-full h-12 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
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
									</div>
									<div
										title="Add User"
										className="border border-slate-600 p-2 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20 hover:bg-black/50"
										onClick={() =>
											handleAddUser(
												user?._id,
												user?.firstName
											)
										}
									>
										<IoPersonAddOutline />
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
			{addUserName && (
				<>
					<div className="w-full min-h-10 p-2"></div>
					<div className="px-2 w-full fixed bottom-1 right-0">
						<div className="w-full h-12 border-slate-500 bg-blue-950 border rounded-lg flex justify-between items-center p-2 font-semibold gap-2 transition-all cursor-pointer text-white ">
							<h1 className="line-clamp-1">
								Confirm addition of '{addUserName}'?
							</h1>
							<div className="flex gap-1">
								<div
									onClick={() => {
										setAddUserName("");
										setAddUserId("");
									}}
									className="border border-slate-600 p-1.5 w-fit font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
								>
									<VscError fontSize={19} />
								</div>
								<div
									onClick={() => handleAddUserCall()}
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

export default MemberAdd;
