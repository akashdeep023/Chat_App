import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import conditionSlice from "./auth/conditionSlice";
import myChatSlice from "./auth/myChatSlice";
import messageSlice from "./auth/messageSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		condition: conditionSlice,
		myChat: myChatSlice,
		message: messageSlice,
	},
});

export default store;
