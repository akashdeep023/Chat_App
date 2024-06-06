import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const Applayout = () => {
	return (
		<div>
			<Provider store={store}>
				<ToastContainer
					position="top-left"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					stacked
					limit={3}
					toastStyle={{
						border: "1px solid #dadadaaa",
						textTransform: "capitalize",
					}}
					// transition:Bounce
				/>
				<Header />
				<div className="min-h-[85vh] p-4 bg-gradient-to-tr to-black via-blue-900 from-black">
					<Outlet />
				</div>
				<Footer />
			</Provider>
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
