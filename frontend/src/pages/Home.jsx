import React, { useEffect, useRef, useState } from "react";
import Boy_Img from "../assets/boy.png";
import Group_Img from "../assets/group.png";
import {
	FaArrowAltCircleDown,
	FaEllipsisV,
	FaFolderOpen,
	FaPaperPlane,
	FaPenAlt,
} from "react-icons/fa";
import { MdChat, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addAllUsers } from "../redux/auth/usersSlice";
import UserSearch from "../components/UserSearch";

const Home = () => {
	const chatBox = useRef();
	const mediaFile = useRef();
	const [scrollShow, setScrollShow] = useState(true);
	const [chatMenuBtn, setChatMenuBtn] = useState(false);
	const [mediaBox, setMediaBox] = useState(false);
	const [mediaURL, setMediaURL] = useState("");
	const dispatch = useDispatch();
	const users = useSelector((store) => store.users.users);
	const authUserId = useSelector((store) => store?.auth?._id);
	const [userSearchBox, setUserSearchBox] = useState(false);

	// Media Box Control
	const handleMediaBox = () => {
		if (mediaFile.current?.files[0]) {
			const file = mediaFile.current.files[0];
			const url = URL.createObjectURL(file);
			setMediaURL(url);
			setMediaBox(true);
		} else {
			setMediaBox(false);
		}
	};
	// Media Box Hidden && Input file remove
	const clearMediaFile = () => {
		mediaFile.current.value = "";
		setMediaURL("");
		setMediaBox(false);
	};
	// Handle Chat Box Scroll Down
	const handleScrollDownChat = () => {
		if (chatBox.current) {
			chatBox.current.scrollTo({
				top: chatBox.current.scrollHeight,
				behavior: "smooth",
			});
		}
	};
	// Scroll Button Hidden
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = chatBox.current.scrollTop;
			if (
				currentScrollPos + chatBox.current.clientHeight <
				chatBox.current.scrollHeight - 30
			) {
				setScrollShow(true);
			} else {
				setScrollShow(false);
			}
		};
		const chatBoxCurrent = chatBox.current;
		chatBoxCurrent.addEventListener("scroll", handleScroll);
		return () => {
			chatBoxCurrent.removeEventListener("scroll", handleScroll);
		};
	}, []);
	// Handle Chat Box Scroll Down 1st Time
	useEffect(() => {
		handleScrollDownChat();
	}, []);
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
			<div className="absolute bottom-4 right-[61%] cursor-pointer text-white">
				<MdChat
					fontSize={30}
					onClick={() => setUserSearchBox(!userSearchBox)}
				/>
			</div>
			{userSearchBox ? (
				<UserSearch />
			) : (
				<div className="hidden sm:block sm:w-[40%] h-[80vh] bg-black/40 border-r border-slate-500">
					<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white border-slate-500 border-r">
						<h1>My Chat</h1>
						<div className="flex items-center gap-2 border border-slate-600 py-1 px-2 rounded-md cursor-pointer hover:bg-slate-600 active:bg-black/20">
							<h1>New Group Create</h1>
							<FaPenAlt />
						</div>
					</div>
					<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[73vh]">
						<div className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 bg-gradient-to-tr hover:bg-gradient-to-tr to-slate-800 text-black via-white  from-slate-800 transition-all cursor-pointer">
							<img
								className="h-12 w-12 rounded-full"
								src={Group_Img}
								alt="img"
							/>
							<span className="line-clamp-1">Tech Group</span>
						</div>
						{/* {users?.map((user) => {
							return (
								<div
									key={user?._id}
									className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-gradient-to-tr to-slate-800 text-white hover:text-black via-white  from-slate-800 transition-all cursor-pointer"
								>
									<img
										className="h-12 w-12 rounded-full"
										src={user?.image || Boy_Img}
										alt="img"
									/>
									<span className="line-clamp-1 capitalize">
										{user?.firstName} {user?.lastName}
									</span>
									<span className="font-light text-xs">
										{
											user?.createdAt
												?.toString()
												.split("T")[0]
										}
									</span>
								</div>
							);
						})} */}
					</div>
				</div>
			)}
			<div className="sm:w-[60%] w-full h-[80vh] bg-black/40 relative">
				<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white">
					<h1>Tech Group</h1>
					<FaEllipsisV
						className="cursor-pointer"
						onClick={() => setChatMenuBtn(true)}
					/>
				</div>
				{chatMenuBtn && (
					<div className="border-slate-500 border rounded-md absolute top-2 right-2 bg-gradient-to-tr to-slate-800 text-black from-white flex items-center justify-center gap-4 w-48 h-48 ">
						<MdOutlineClose
							size={22}
							className="absolute top-2 right-3 cursor-pointer"
							onClick={() => setChatMenuBtn(false)}
						/>
						<div className="flex flex-col items-start gap-4 justify-center">
							<span>Setting</span>
							<span>Clear Chat</span>
						</div>
					</div>
				)}
				{scrollShow && (
					<div
						className="absolute bottom-16 right-5 cursor-pointer opacity-80"
						onClick={handleScrollDownChat}
					>
						<FaArrowAltCircleDown size={30} />
					</div>
				)}
				{mediaBox && (
					<div className="border-slate-500 border rounded-md absolute bottom-[7vh] mb-1 left-2 bg-slate-800 w-60 h-48 ">
						<img
							src={mediaURL}
							alt="media"
							className="h-full w-full object-contain"
						/>
						<MdOutlineClose
							size={25}
							className="absolute top-2 right-3 cursor-pointer text-white bg-slate-800 rounded-xl p-1"
							onClick={clearMediaFile}
						/>
					</div>
				)}
				<div
					className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[66vh]"
					ref={chatBox}
				>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Hi
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Hello
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						How are you?
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Fine
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Ok Bye.
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Hi
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Hello
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						How are you?
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Fine
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Ok Bye.
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Hi
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Hello
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						How are you?
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Fine
					</span>
					<span className="self-end border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 from-green-400 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border-slate-500 border rounded-lg py-1 px-2 bg-gradient-to-tr to-slate-800 text-black from-white">
						Ok Bye.
					</span>
				</div>
				<div className="w-full flex items-center gap-1 h-[7vh] p-3 bg-slate-800 text-white">
					<label htmlFor="media" className="cursor-pointer">
						<FaFolderOpen
							size={22}
							className="active:scale-75 hover:text-green-400"
						/>
					</label>
					<input
						ref={mediaFile}
						type="file"
						name="image"
						accept="image/png, image/jpg, image/gif, image/jpeg"
						id="media"
						className="hidden"
						onChange={handleMediaBox}
					/>
					<input
						type="text"
						className="outline-none p-2 w-full bg-transparent"
						placeholder="Type a message"
					/>
					<span>
						<button className="outline-none p-2 border-slate-500 border-l">
							<FaPaperPlane
								size={18}
								className="active:scale-75 hover:text-green-400"
							/>
						</button>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
