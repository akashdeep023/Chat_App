import React, { useEffect } from "react";
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import handleScrollTop from "./utils/handleScrollTop";

const Applayout = () => {
	// Scroll to top of page --------------------------------
	const { pathname } = useLocation();
	useEffect(() => {
		handleScrollTop();
	}, [pathname]);
	return (
		<div>
			<Header />
			<div className="min-h-[85vh] p-4 bg-gradient-to-tr to-black via-blue-900 from-black">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
const routers = createBrowserRouter([
	{
		path: "/",
		element: <Applayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "*",
				element: <Error />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={routers} />;
}

export default App;
