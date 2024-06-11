import React from "react";

import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setProfileDetail } from "../redux/auth/conditionSlice";

const ProfileDetail = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.auth);
	return (
		<div className="flex flex-col items-center my-6 text-slate-300 min-h-screen w-full fixed top-0 justify-center z-50">
			<div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit mt-5 transition-all relative">
				<h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-4">
					Profile
				</h2>
				<div className="w-full justify-between flex flex-wrap items-center">
					<div>
						<h3 className="text-xl font-semibold p-1">
							Name : {user.firstName} {user.lastName}
						</h3>
						<h3 className="text-xl font-semibold p-1">
							Email : {user.email}
						</h3>
					</div>
					<img
						src={user.image}
						alt="user/image"
						className="w-20 h-20"
					/>
				</div>
				<div>
					<button
						onClick={() => {
							localStorage.removeItem("token");
							window.location.reload();
						}}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
					>
						Logout
					</button>
					<MdOutlineClose
						size={22}
						className="absolute top-2 right-3 cursor-pointer"
						onClick={() => dispatch(setProfileDetail())}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetail;
