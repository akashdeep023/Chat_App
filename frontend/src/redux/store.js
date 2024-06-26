import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import conditionSlice from "./slices/conditionSlice";
import myChatSlice from "./slices/myChatSlice";
import messageSlice from "./slices/messageSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		condition: conditionSlice,
		myChat: myChatSlice,
		message: messageSlice,
	},
});

export default store;
