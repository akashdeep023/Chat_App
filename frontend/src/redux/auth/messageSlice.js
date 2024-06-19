import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
	name: "message",
	initialState: {
		message: [],
		newMessageId: "",
		chatName: "",
	},
	reducers: {
		addAllMessages: (state, action) => {
			state.message = action.payload;
		},
		addNewMessageId: (state, action) => {
			state.newMessageId = action.payload;
		},
		addChatName: (state, action) => {
			state.chatName = action.payload;
		},
	},
});

export const { addAllMessages, addNewMessageId, addChatName } =
	messageSlice.actions;
export default messageSlice.reducer;
