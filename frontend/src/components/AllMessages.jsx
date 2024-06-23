import React, { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const AllMessages = ({ allMessage }) => {
	const chatBox = useRef();
	const adminId = useSelector((store) => store.auth?._id);
	const [scrollShow, setScrollShow] = useState(true);
	// Handle Chat Box Scroll Down
	const handleScrollDownChat = () => {
		if (chatBox.current) {
			chatBox.current.scrollTo({
				top: chatBox.current.scrollHeight,
				// behavior: "smooth",
			});
		}
	};
	// Scroll Button Hidden
	useEffect(() => {
		handleScrollDownChat();
		if (chatBox.current.scrollHeight == chatBox.current.clientHeight) {
			setScrollShow(false);
		}
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

	return (
		<>
			{scrollShow && (
				<div
					className="absolute bottom-16 right-5 cursor-pointer opacity-80"
					onClick={handleScrollDownChat}
				>
					<FaArrowAltCircleDown title="Scroll Down" size={30} />
				</div>
			)}
			<div
				className="flex flex-col w-full px-4 gap-2 py-2 overflow-y-auto overflow-hidden scroll-style h-[66vh]"
				ref={chatBox}
			>
				{allMessage?.map((message) => {
					return (
						<div
							key={message._id}
							className={`flex items-start gap-2 ${
								message?.sender?._id === adminId
									? "flex-row-reverse text-white"
									: "flex-row text-black"
							}`}
						>
							{message?.chat?.isGroupChat && (
								<img
									src={message?.sender?.image}
									alt=""
									className="h-9 w-9 rounded-full"
								/>
							)}
							<div
								className={`${
									message?.sender?._id === adminId
										? "bg-gradient-to-tr to-slate-800 from-green-400 rounded-s-lg rounded-ee-2xl"
										: "bg-gradient-to-tr to-slate-800 from-white rounded-e-lg rounded-es-2xl"
								} py-1.5 px-2 min-w-10 text-center flex flex-col relative`}
							>
								{message?.chat?.isGroupChat &&
									message?.sender?._id !== adminId && (
										<span className="text-xs font-bold text-start text-green-900">
											{message?.sender?.firstName}
										</span>
									)}
								<div className="pb-1 pr-12">
									<span>{message?.message}</span>
									<span className="text-xs font-light ml-4 mt-3 absolute bottom-1 right-2">
										{new Date(message?.updatedAt)
											.toTimeString()
											.split(" ")[0]
											.split(":")
											.slice(0, 2)
											.join(":")}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default AllMessages;
