import React, { useEffect, useState } from "react";

import { MdChat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addAllUsers } from "../redux/auth/usersSlice";
import UserSearch from "../components/UserSearch";
import MyChat from "../components/MyChat";
import MessageBox from "../components/MessageBox";
import ChatNotSelected from "../components/ChatNotSelected";
import { setUserSearchBox } from "../redux/auth/conditionSlice";

const Home = () => {
	const dispatch = useDispatch();
	const isUserSearchBox = useSelector(
		(store) => store?.condition?.isUserSearchBox
	);
	const selectedChat = useSelector((store) => store?.condition?.selectedChat);

	// All Users Api Call
	useEffect(() => {
		const getAllUsers = () => {
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
					dispatch(addAllUsers(json.data));
				})
				.catch((err) => console.log(err));
		};
		getAllUsers();
	}, []);

	return (
		<div className="flex w-full border-slate-500 border rounded-sm shadow-md shadow-black relative">
			<div
				className={`${
					selectedChat && "hidden"
				} sm:block sm:w-[40%] w-full h-[80vh] bg-black/40 border-r border-slate-500 relative`}
			>
				<div className="absolute bottom-3 right-5 cursor-pointer text-white">
					<MdChat
						title="New Chat"
						fontSize={30}
						onClick={() => dispatch(setUserSearchBox())}
					/>
				</div>
				{isUserSearchBox ? <UserSearch /> : <MyChat />}
			</div>
			<div
				className={`${
					!selectedChat && "hidden"
				} sm:block sm:w-[60%] w-full h-[80vh] bg-black/40 relative`}
			>
				{selectedChat ? <MessageBox /> : <ChatNotSelected />}
			</div>
		</div>
	);
};

export default Home;
