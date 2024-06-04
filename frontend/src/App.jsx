import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";

const Applayout = () => {
	return (
		<div>
			<Header />
			<div className="min-h-[90vh] p-4">
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
