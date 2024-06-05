import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/chatapp.png";

const Header = () => {
	return (
		<div className="w-full h-16 md:h-20 shadow-gray-950 shadow-inner flex justify-between items-center p-4 font-semibold bg-slate-800 text-white">
			<div className="flex items-center justify-start gap-2">
				<Link to={"/"}>
					<img
						src={Logo}
						alt="ChatApp"
						className="h-12 w-12 rounded-tr-full rounded-tl-full rounded-br-full"
					/>
				</Link>
				<Link to={"/"}>
					<span>ChatApp</span>
				</Link>
			</div>
			<Link to={"/signin"}>
				<span>SingIn</span>
			</Link>
		</div>
	);
};

export default Header;
