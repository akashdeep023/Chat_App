import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [inputfield, setInputField] = useState("");
	const [load, setLoad] = useState("");
	const logInUser = () => {
		// SignIn ---
	};
	const handleLogin = () => {
		if (username && password) {
			setInputField("");
			setLoad("Loading...");
			logInUser();
		} else {
			setInputField("All input fields are not valid");
		}
	};
	return (
		<div className="flex flex-col items-center my-6 text-slate-300 min-h-[80vh]">
			<div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-800 rounded-lg h-fit  mt-5 transition-all">
				<h2 className="text-2xl underline underline-offset-8 font-semibold text-slate-100 w-full text-center mb-4">
					SignIn ChatApp
				</h2>
				<form className="w-full flex justify-between flex-col">
					<h3 className="text-xl font-semibold p-1">
						Enter Username
					</h3>
					<input
						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
						type="text"
						placeholder="Enter Username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<h3 className="text-xl font-semibold p-1">
						Enter Password
					</h3>
					<input
						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
						type="password"
						placeholder="Enter Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="text-red-600 font-semibold self-center">
						{inputfield}
					</div>
					<button
						onClick={(e) => {
							handleLogin();
							e.preventDefault();
						}}
						className="w-full font-semibold hover:bg-black rounded-full px-5 py-4 mt-5 text-lg border border-slate-400  text-slate-400 hover:text-white bg-slate-700 transition-all"
					>
						{load == "" ? "SignIn" : load}
					</button>
					<div className="w-full flex items-center mt-3">
						<div className="w-full h-[1px] bg-slate-600"></div>
						<Link to={"#"}>
							<div className="p-3 font-semibold text-md hover:text-white whitespace-nowrap">
								Forgot Password
							</div>
						</Link>
						<div className="w-full h-[1px] bg-slate-600"></div>
					</div>
					<div className="w-full flex items-center my-3">
						<div className="w-full h-[1px] bg-slate-600"></div>
						<Link to="/signup">
							<div className="p-3 font-semibold text-md hover:text-white">
								SignUp
							</div>
						</Link>
						<div className="w-full h-[1px] bg-slate-600"></div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
