import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi2";
import Overview from "./chatDetails/Overview";
import Member from "./chatDetails/Member";

const ChatDetailsBox = () => {
	const [detailView, setDetailView] = useState("overview");
	return (
		<>
			<div className="w-fit h-[60vh] p-2 flex flex-col gap-1.5 bg-slate-900">
				<div
					className={`flex gap-2 items-center p-1 text-white rounded-md px-2 cursor-pointer ${
						detailView === "overview"
							? "bg-blue-950"
							: "bg-slate-800"
					}`}
					onClick={() => setDetailView("overview")}
				>
					<CiCircleInfo fontSize={18} />
					<span>Overview</span>
				</div>
				<div
					className={`flex gap-2 items-center p-1 text-white rounded-md px-2 cursor-pointer ${
						detailView === "members"
							? "bg-blue-950"
							: "bg-slate-800"
					}`}
					onClick={() => setDetailView("members")}
				>
					<HiOutlineUsers fontSize={18} />
					<span>Members</span>
				</div>
				<div
					className={`flex gap-2 items-center p-1 text-white rounded-md px-2 cursor-pointer ${
						detailView === "other" ? "bg-blue-950" : "bg-slate-800"
					}`}
					onClick={() => setDetailView("other")}
				>
					<span>Other</span>
				</div>
			</div>
			<div className="w-full h-[60vh] p-2">
				{detailView === "overview" && <Overview />}
				{detailView === "members" && <Member />}
				{detailView === "other" && <div>Other</div>}
			</div>
		</>
	);
};

export default ChatDetailsBox;
