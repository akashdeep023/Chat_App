import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});

export default store;
