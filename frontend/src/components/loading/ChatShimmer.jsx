import React from "react";

const ChatShimmer = () => {
	return (
		<>
			{Array(10)
				.fill("")
				.map((el, idx) => {
					return (
						<div
							key={idx}
							className="w-full h-16 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
						>
							<div className="h-12 min-w-12 rounded-full border border-slate-600 shimmer-animated"></div>
							<div className="w-full">
								<div className="line-clamp-1 capitalize rounded-lg h-3 w-3/4 min-w-32 border border-slate-600 shimmer-animated mb-3.5"></div>
								<div className="line-clamp-1 capitalize rounded-lg h-3 w-1/2 min-w-24 border border-slate-600 shimmer-animated"></div>
							</div>
						</div>
					);
				})}
		</>
	);
};
export const ChatShimmerSmall = () => {
	return (
		<>
			{Array(10)
				.fill("")
				.map((el, idx) => {
					return (
						<div
							key={idx}
							className="w-full h-12 border-slate-500 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-black/50 transition-all cursor-pointer text-white"
						>
							<div className="h-10 min-w-10 rounded-full border border-slate-600 shimmer-animated"></div>
							<div className="line-clamp-1 capitalize rounded-lg h-3 w-3/4 min-w-32 border border-slate-600 shimmer-animated"></div>
							<div className="h-8 min-w-8 rounded-lg border border-slate-600 shimmer-animated"></div>
						</div>
					);
				})}
		</>
	);
};

export default ChatShimmer;
