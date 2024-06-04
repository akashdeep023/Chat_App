import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="w-full h-16 md:h-20 shadow-gray-950 shadow-inner flex justify-between items-center p-4 font-semibold bg-slate-800 text-white">
			<Link to={"/"}>
				<span>Chat App</span>
			</Link>
			<Link to={"/signin"}>
				<span>SingIn</span>
			</Link>
		</div>
	);
};

export default Header;
