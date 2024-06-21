import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatLoading, setGroupChatBox } from "../redux/auth/conditionSlice";
import { MdOutlineClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import ChatShimmer from "./loading/ChatShimmer";

const GroupChatBox = () => {
	const dispatch = useDispatch();
	const isChatLoading = useSelector(
		(store) => store?.condition?.isChatLoading
	);
	const [users, setUsers] = useState([]);
	const [inputUserName, setInputUserName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [isGroupUsers, setGroupUsers] = useState([]);
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
	// const handleCreateGroupChat = async (userId) => {
	// 	dispatch(setLoading(true));
	// 	const token = localStorage.getItem("token");
	// 	fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 		body: JSON.stringify({
	// 			userId: userId,
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((json) => {
	// 			dispatch(setSelectedChat(json.data?._id));
	// 			dispatch(setLoading(false));
	// 			toast.success("Created & Selected chat");
	// 			dispatch(setUserSearchBox());
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			toast.error(err.message);
	// 			dispatch(setLoading(false));
	// 		});
	// };
	return (
		<div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50">
			<div className="p-3 pt-4 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit mt-5 transition-all relative">
				<h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-2">
					Create a Group
				</h2>
				<div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
					<div className="w-full flex flex-nowrap items-center justify-center gap-2">
						<input
							id="search"
							type="text"
							placeholder="Search Users..."
							className="w-2/3 border border-slate-600 py-1 px-2 font-normal outline-none rounded-md cursor-pointer bg-transparent active:bg-black/20"
							onChange={(e) => setInputUserName(e.target?.value)}
						/>
						<label htmlFor="search" className="cursor-pointer">
							<FaSearch title="Add Users" />
						</label>
					</div>
					<div className="flex  w-full px-4 gap-1 py-2 overflow-auto scroll-style-x">
						{
							// isGroupUsers?.length != 0 &&
							isGroupUsers?.map((user) => {
								return (
									<div className="border border-slate-600 py-1 px-2 font-normal rounded-md cursor-pointer bg-transparent active:bg-black/20 text-nowrap">
										<h1>{user?.firstName}</h1>
									</div>
								);
							})
						}
					</div>
					<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[50vh]">
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
											onClick={() =>
												setGroupUsers([
													...isGroupUsers,
													user,
												])
											}
										>
											<img
												className="h-12 min-w-12 rounded-full"
												src={user?.image}
												alt="img"
											/>
											<div className="w-full">
												<span className="line-clamp-1 capitalize">
													{user?.firstName}{" "}
													{user?.lastName}
												</span>
												<div>
													<span className="text-xs font-light">
														{new Date(
															user?.createdAt
														).toDateString()}
													</span>{" "}
													<span className="text-xs font-light">
														{
															new Date(
																user?.createdAt
															)
																.toTimeString()
																.split(" ")[0]
														}
													</span>
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
				<div className="bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer">
					<MdOutlineClose
						title="Close"
						size={22}
						onClick={() => dispatch(setGroupChatBox())}
					/>
				</div>
			</div>
		</div>
	);
};

export default GroupChatBox;
