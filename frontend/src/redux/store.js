import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import usersSlice from "./auth/usersSlice";
import conditionSlice from "./auth/conditionSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		users: usersSlice,
		condition: conditionSlice,
	},
});

export default store;
