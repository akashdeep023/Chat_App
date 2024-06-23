import { createSlice } from "@reduxjs/toolkit";

const myChatSlice = createSlice({
	name: "myChat",
	initialState: {
		chat: [],
		selectedChat: null,
	},
	reducers: {
		addMyChat: (state, action) => {
			state.chat = action.payload;
		},
		addSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
	},
});

export const { addMyChat, addSelectedChat } = myChatSlice.actions;
export default myChatSlice.reducer;
