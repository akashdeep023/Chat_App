import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/chatapp.png";
import { useDispatch, useSelector } from "react-redux";
import { addAuth, removeAuth } from "../redux/auth/authSlice";
import handleScrollTop from "../utils/handleScrollTop";

const Header = () => {
	const user = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const getAuthUser = (token) => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(addAuth(json.data));
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (token) {
			navigate("/");
			getAuthUser(token);
		} else {
			navigate("/signin");
		}
	}, [token]);
	// Scroll to top of page && Redirect Auth change --------------------------------
	const { pathname } = useLocation();
	useEffect(() => {
		if (user) {
			navigate("/");
		} else {
			navigate("/signin");
		}
		handleScrollTop();
	}, [pathname, user]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(removeAuth());
		navigate("/signin");
	};

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
			{user ? (
				<div className="">
					<span>Hi, {user.firstName}</span>
					<button
						onClick={handleLogout}
						className="ml-3 py-2 px-4 border border-slate-400 rounded-full bg-gradient-to-tr to-slate-800 text-black via-white  from-slate-800 hover:bg-gradient-to-br shadow-sm hover:shadow-white"
					>
						LogOut
					</button>
				</div>
			) : (
				<Link to={"/signin"}>
					<button className="py-2 px-4 border border-slate-400 rounded-full bg-gradient-to-tr to-slate-800 text-black via-white  from-slate-800 hover:bg-gradient-to-br shadow-sm hover:shadow-white">
						SingIn
					</button>
				</Link>
			)}
		</div>
	);
};

export default Header;
