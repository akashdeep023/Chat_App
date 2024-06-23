import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { VscCheckAll } from "react-icons/vsc";

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
					className="absolute bottom-16 right-4 cursor-pointer opacity-80 z-20"
					onClick={handleScrollDownChat}
				>
					<FaArrowAltCircleDown title="Scroll Down" size={30} />
				</div>
			)}
			<div
				className="flex flex-col w-full px-3 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[66vh]"
				ref={chatBox}
			>
				{allMessage?.map((message, idx) => {
					return (
						<Fragment key={message._id}>
							<div className="sticky top-0 flex w-full justify-center z-10">
								{new Date(
									allMessage[idx - 1]?.updatedAt
								).toDateString() !==
									new Date(
										message?.updatedAt
									).toDateString() && (
									<span className="text-xs font-light mb-2 mt-1 text-white/50 bg-black h-7 w-fit px-5 rounded-md flex items-center justify-center cursor-pointer">
										{new Date(message?.updatedAt)
											.toDateString()
											.split(" ")
											.slice(0, 3)
											.reverse()
											.join("-")}
									</span>
								)}
							</div>
							<div
								className={`flex items-start gap-2 ${
									message?.sender?._id === adminId
										? "flex-row-reverse text-white"
										: "flex-row text-black"
								}`}
							>
								{message?.chat?.isGroupChat &&
									message?.sender?._id !== adminId && (
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
									} py-1.5 px-2 min-w-10 text-start flex flex-col relative max-w-[85%]`}
								>
									{message?.chat?.isGroupChat &&
										message?.sender?._id !== adminId && (
											<span className="text-xs font-bold text-start text-green-900">
												{message?.sender?.firstName}
											</span>
										)}
									<div className="pb-1 pr-14">
										<span>{message?.message}</span>
										<span className="text-xs font-light absolute bottom-1 right-2 flex items-end gap-1.5">
											{new Date(message?.updatedAt)
												.toTimeString()
												.split(" ")[0]
												.split(":")
												.slice(0, 2)
												.join(":")}
											{message?.sender?._id ===
												adminId && (
												<VscCheckAll
													color="white"
													fontSize={14}
												/>
											)}
										</span>
									</div>
								</div>
							</div>
						</Fragment>
					);
				})}
			</div>
		</>
	);
};

export default AllMessages;
