import React from "react";

const Loading = () => {
	return (
		<div className="flex -m-2 sm:-m-4 flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50 bg-black/60">
			<div id="loader"></div>
		</div>
	);
};

export default Loading;
