import React, { useEffect, useRef, useState } from "react";
import {
	FaArrowAltCircleDown,
	FaArrowLeft,
	FaEllipsisV,
	FaFolderOpen,
	FaPaperPlane,
} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { setChatMenuBtn, setSelectedChat } from "../redux/auth/conditionSlice";
import { useDispatch, useSelector } from "react-redux";

const MessageBox = () => {
	const chatBox = useRef();
	const mediaFile = useRef();
	const [scrollShow, setScrollShow] = useState(true);
	const [mediaBox, setMediaBox] = useState(false);
	const [mediaURL, setMediaURL] = useState("");
	const isChatMenuBtn = useSelector(
		(store) => store?.condition?.isChatMenuBtn
	);

	const dispatch = useDispatch();

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
	return (
		<>
			<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center bg-slate-800 text-white">
				<div className="flex items-center gap-3">
					<div className="sm:hidden bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center cursor-pointer">
						<FaArrowLeft
							title="Back"
							fontSize={14}
							onClick={() => dispatch(setSelectedChat(""))}
						/>
					</div>
					<h1>Tech Group</h1>
				</div>
				<FaEllipsisV
					title="Menu"
					className="cursor-pointer"
					onClick={() => dispatch(setChatMenuBtn(true))}
				/>
			</div>
			{isChatMenuBtn && (
				<div className="pt-4 border border-slate-500 text-white w-40 h-32 py-2 flex flex-col justify-center rounded-md items-center gap-1 absolute top-2 right-3 z-40 bg-slate-700">
					<div className="bg-black/15 hover:bg-black/50 h-6 w-6 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer">
						<MdOutlineClose
							title="Close"
							size={20}
							onClick={() => dispatch(setChatMenuBtn(false))}
						/>
					</div>
					<div className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-slate-400 hover:text-black p-1">
						Setting
					</div>
					<div className="flex flex-nowrap items-center w-full h-fit cursor-pointer justify-center hover:bg-slate-400 hover:text-black p-1">
						Clear Chat
					</div>
				</div>
			)}
			{scrollShow && (
				<div
					className="absolute bottom-16 right-5 cursor-pointer opacity-80"
					onClick={handleScrollDownChat}
				>
					<FaArrowAltCircleDown title="Scroll Down" size={30} />
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
						title="Delete"
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
						title="Open File"
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
							title="Send"
							size={18}
							className="active:scale-75 hover:text-green-400"
						/>
					</button>
				</span>
			</div>
		</>
	);
};

export default MessageBox;
