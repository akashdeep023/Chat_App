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
				className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[66vh]"
				ref={chatBox}
			>
				{allMessage?.map((message) => {
					return (
						<div
							key={message._id}
							className={`flex items-center gap-2 ${
								message?.sender?._id === adminId
									? "flex-row-reverse text-white"
									: "flex-row text-black"
							}`}
						>
							<div
								className={`${
									message?.sender?._id === adminId
										? "bg-gradient-to-tr to-slate-800 from-green-400"
										: "bg-gradient-to-tr to-slate-800 from-white"
								} rounded-lg py-1 px-2`}
							>
								{message.message}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default AllMessages;
