import React, { useState } from "react";
import MemberAdd from "./MemberAdd";
import MemberRemove from "./MemberRemove";
import { useSelector } from "react-redux";

const Member = () => {
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const [memberAddBox, setMemberAddBox] = useState(false);

	return (
		<div className="flex flex-col pt-2 gap-2 text-white relative h-full z-10 overflow-auto scroll-style">
			<div className="font-semibold text-lg w-full text-center mt-2">
				Members ( {selectedChat?.users?.length} )
			</div>
			{memberAddBox ? (
				<MemberAdd setMemberAddBox={setMemberAddBox} />
			) : (
				<MemberRemove setMemberAddBox={setMemberAddBox} />
			)}
		</div>
	);
};

export default Member;
