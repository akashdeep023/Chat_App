import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedChat,
	removeNewMessageRecieved,
} from "../redux/slices/myChatSlice";
import { setNotificationBox } from "../redux/slices/conditionSlice";
import { MdOutlineClose } from "react-icons/md";
import { SimpleDateAndTime } from "../utils/formateDateTime";
import getChatName from "../utils/getChatName";

const NotificationBox = () => {
	const authUserId = useSelector((store) => store?.auth?._id);
	const dispatch = useDispatch();
	const newMessageRecieved = useSelector(
		(store) => store?.myChat?.newMessageRecieved
	);
	return (
		<div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50">
			<div className="p-3 pt-4 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit mt-5 transition-all relative">
				<h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-2">
					Notification
				</h2>
				{newMessageRecieved.length > 0 && (
					<p className="px-4 pt-2">
						You have {newMessageRecieved.length} new notifications
					</p>
				)}
				<div className="w-full py-4 justify-evenly flex flex-wrap items-center gap-3">
					<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[50vh]">
						{newMessageRecieved.length == 0 && false ? (
							<div>Shimmer</div>
						) : (
							<>
								{newMessageRecieved?.length === 0 && (
									<div className="w-full h-full flex justify-center items-center text-white">
										<h1 className="text-base font-semibold">
											You have 0 new notifications
										</h1>
									</div>
								)}
								{newMessageRecieved?.map((message) => {
									return (
										<div
											key={message?._id}
											className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-normal gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
											onClick={() => {
												dispatch(
													removeNewMessageRecieved(
														message
													)
												);
												dispatch(
													addSelectedChat(
														message?.chat
													)
												);
												dispatch(
													setNotificationBox(false)
												);
											}}
										>
											<div className="w-full">
												<span className="line-clamp-1 capitalize">
													New message{" "}
													{message?.chat
														?.isGroupChat &&
														"in " +
															getChatName(
																message?.chat,
																authUserId
															)}{" "}
													from{" "}
													{message?.sender?.firstName}{" "}
													:{" "}
													<span className="text-green-400">
														{message?.message}
													</span>
												</span>
												<span className="text-xs font-light">
													{SimpleDateAndTime(
														message?.createdAt
													)}
												</span>
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				</div>
				<div
					title="Close"
					onClick={() => dispatch(setNotificationBox(false))}
					className="bg-black/15 hover:bg-black/50 h-7 w-7 rounded-md flex items-center justify-center absolute top-2 right-3 cursor-pointer"
				>
					<MdOutlineClose size={22} />
				</div>
			</div>
		</div>
	);
};

export default NotificationBox;
