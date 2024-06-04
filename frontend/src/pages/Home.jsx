import React from "react";
import Boy_Img from "../assets/boy.png";
import Girl_Img from "../assets/girl.png";
import {
	Fa500Px,
	FaArrowRight,
	FaBeer,
	FaFacebookMessenger,
	FaFileMedicalAlt,
	FaFolderOpen,
	FaPaperPlane,
	FaSadTear,
	FaSeedling,
	FaSmog,
} from "react-icons/fa";

const Home = () => {
	return (
		<div className="flex w-full border border-slate-800 rounded-sm shadow-md shadow-black">
			<div className="w-0 sm:w-[40%] h-[80vh] relative">
				<h1 className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center sticky top-0 left-0 bg-slate-800 text-white border-r">
					ChatsApp
				</h1>
				<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[73vh]">
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Boy_Img}
							alt="img"
						/>
						<span className="line-clamp-1">
							Group Name Group Name Group Name
						</span>
					</div>
					<div className="w-full h-16 border rounded-lg flex justify-start items-center p-2 font-semibold gap-2 hover:bg-slate-400 cursor-pointer">
						<img
							className="h-12 w-12 rounded-full"
							src={Girl_Img}
							alt="img"
						/>
						<span className="line-clamp-1">Group Name</span>
					</div>
				</div>
			</div>
			<div className="sm:w-[60%] w-full h-[80vh] relative">
				<div className="p-6 w-full h-[7vh] font-semibold flex justify-between items-center sticky top-0 left-0 bg-slate-800 text-white">
					<h1>Group Name</h1>
					<span className="rotate-90 font-bold cursor-pointer text-lg">
						...
					</span>
				</div>
				<div className="flex flex-col w-full px-4 gap-1 py-2 overflow-y-scroll overflow-hidden scroll-style h-[66vh]">
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Hi
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Hello
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						How are you?
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Fine
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Ok Bye.
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Hi
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Hello
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						How are you?
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Fine
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Ok Bye.
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Hi
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Hello
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						How are you?
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Fine
					</span>
					<span className="self-end border rounded-lg py-1 px-2 bg-green-700 text-white">
						Ok Bye bye.
					</span>
					<span className="self-start border rounded-lg py-1 px-2 bg-gray-400">
						Ok Bye.
					</span>
				</div>
				<div className="w-full flex items-center gap-1 h-[7vh] p-3 bg-slate-800 text-white">
					<label htmlFor="media" className="cursor-pointer">
						<FaFolderOpen size={22} />
					</label>
					<input
						type="file"
						name="image"
						accept="image/png, image/jpg, image/gif, image/jpeg"
						id="media"
						className="hidden"
					/>
					<input
						type="text"
						className="outline-none p-2 w-full bg-transparent"
						placeholder="Type a message"
					/>
					<span>
						<button className="outline-none p-2 border-l">
							<FaPaperPlane size={18} />
						</button>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
