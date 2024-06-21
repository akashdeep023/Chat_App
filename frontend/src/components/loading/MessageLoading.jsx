import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const MessageLoading = () => {
	return (
		<div className="flex justify-center w-full px-4 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[66vh]">
			<AiOutlineLoading3Quarters
				fontSize={23}
				color="white"
				className="animate-spin mt-5"
			/>
		</div>
	);
};

export default MessageLoading;
