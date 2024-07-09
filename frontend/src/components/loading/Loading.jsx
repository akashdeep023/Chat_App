import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/conditionSlice";

const Loading = () => {
	const dispatch = useDispatch();
	const [showCancel, setShowCancel] = useState(false);
	useEffect(() => {
		const setId = setTimeout(() => {
			setShowCancel(true);
		}, 10000);
		return () => {
			clearTimeout(setId);
		};
	}, []);
	return (
		<div className="flex  flex-col items-center text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50 bg-black/60">
			<div id="loader"></div>
			<div className="mt-5 h-10 w-24 flex justify-center items-center">
				{showCancel && (
					<div className="font-bold  cursor-pointer border border-slate-700 py-2 px-4 rounded-md bg-slate-900 hover:bg-black/80">
						<span onClick={() => dispatch(setLoading(false))}>
							Cancel
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Loading;
