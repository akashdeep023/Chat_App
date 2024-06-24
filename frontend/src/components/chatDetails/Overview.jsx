import React from "react";
import { useSelector } from "react-redux";
import getChatName, { getChatImage } from "../../utils/getChatName";
import { SimpleDateAndTime } from "../../utils/formateDateTime";

import { CiCircleInfo } from "react-icons/ci";

const Overview = () => {
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);

	return (
		<div className="flex flex-col gap-2 text-white">
			<div className="flex flex-col items-center justify-center gap-2 mb-3 mt-3">
				<img
					src={getChatImage(selectedChat, authUserId)}
					alt=""
					className="h-16 w-16 rounded-full"
				/>
				<div className="text-center leading-5 font-semibold text-lg flex items-center gap-1">
					<h1>{getChatName(selectedChat, authUserId)}</h1>
					{selectedChat?.isGroupChat && (
						<CiCircleInfo
							fontSize={15}
							title="Change Name"
							className="cursor-pointer"
						/>
					)}
				</div>
			</div>
			<div className="h-0.5 w-full bg-slate-900/50"></div>
			<div className="text-sm mt-1">
				<h1>Created</h1>
				<h2 className="opacity-50">
					{SimpleDateAndTime(selectedChat?.createdAt)}
				</h2>
			</div>
			<div className="text-sm">
				<h1>Last Message</h1>
				<h2 className="opacity-50">
					{SimpleDateAndTime(selectedChat?.updatedAt)}
				</h2>
			</div>
		</div>
	);
};

export default Overview;
