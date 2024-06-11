import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserSearch = () => {
	const users = useSelector((store) => store.users.users);
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
	return (
		<div className="hidden sm:block sm:w-[40%] h-[80vh] bg-black/40 border-r border-slate-500">
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
				<h1 className="mr-2">ChatsApp</h1>
				<div className="w-2/3 flex flex-nowrap items-center gap-2">
					<input
						type="text"
						placeholder="Search"
						className="w-full px-2 py-1.5 font-normal rounded-sm outline-none text-black"
						onChange={(e) => setInputUserName(e.target?.value)}
					/>
					<FaSearch />
				</div>
			</div>
			<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[73vh]">
				{selectedUsers?.map((user) => {
					return (
						<div
							key={user?._id}
							className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-gradient-to-tr to-slate-800 text-white hover:text-black via-white  from-slate-800 transition-all cursor-pointer"
						>
							<img
								className="h-12 w-12 rounded-full"
								src={user?.image}
								alt="img"
							/>
							<span className="line-clamp-1 capitalize">
								{user?.firstName} {user?.lastName}
							</span>
							<span className="font-light text-xs">
								{user?.createdAt?.toString().split("T")[0]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UserSearch;
