import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import conditionSlice from "./auth/conditionSlice";
import myChatSlice from "./auth/myChatSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		condition: conditionSlice,
		myChat: myChatSlice,
	},
});

export default store;
