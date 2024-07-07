import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import ProfileDetail from "./components/ProfileDetail";
import Loading from "./components/loading/Loading";
import GroupChatBox from "./components/chatComponents/GroupChatBox";
import NotificationBox from "./components/NotificationBox";
// import GroupChatBox from "./components/GroupChatBox";

const Applayout = () => {
    const [toastPosition, setToastPosition] = useState("bottom-left");
    const isProfileDetails = useSelector(
        (store) => store.condition.isProfileDetail
    );
    const isGroupChatBox = useSelector(
        (store) => store.condition.isGroupChatBox
    );
    const isNotificationBox = useSelector(
        (store) => store.condition.isNotificationBox
    );
    const isLoading = useSelector((store) => store.condition.isLoading);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 600) {
                setToastPosition("bottom-left");
            } else {
                setToastPosition("top-left");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div>
            <ToastContainer
                position={toastPosition}
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
            <div className="h-16 md:h-20"></div>
            <div className="min-h-[85vh] p-2 sm:p-4  bg-gradient-to-tr to-black via-blue-900 from-black">
                <Outlet />
                {isProfileDetails && <ProfileDetail />}
                {isGroupChatBox && <GroupChatBox />}
                {isNotificationBox && <NotificationBox />}
            </div>
            {isLoading && <Loading />}
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
        errorElement: <Error />,
    },
]);

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={routers} />
        </Provider>
    );
}

export default App;
