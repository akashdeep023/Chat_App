import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<div className="w-full h-dvh flex flex-col items-center justify-center">
			<h1 className="text-xl sm:text-2xl font-bold">
				Something went wrong
			</h1>
			<h1 className="text-lg sm:text-xl font-bold">404 | Bad request</h1>
			<Link className="underline underline-offset-2" to={"/"}>
				Home
			</Link>
		</div>
	);
};

export default Error;
