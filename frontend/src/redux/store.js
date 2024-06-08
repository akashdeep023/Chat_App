import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import usersSlice from "./auth/usersSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		users: usersSlice,
	},
});

export default store;
