import React from "react";
import { setLoading } from "../redux/auth/conditionSlice";
import { useDispatch } from "react-redux";

const Loading = () => {
	const dispatch = useDispatch();
	return (
		<div className="flex  flex-col items-center text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50 bg-black/60">
			<div id="loader"></div>
			<div
				className="font-bold mt-5 cursor-pointer border border-slate-700 py-2 px-4 rounded-md"
				onClick={() => dispatch(setLoading(false))}
			>
				Cancel
			</div>
		</div>
	);
};

export default Loading;
