import { createSlice } from "@reduxjs/toolkit";

const myChatSlice = createSlice({
	name: "myChat",
	initialState: {
		chat: [],
		selectedChat: null,
		newMessageRecieved: [],
	},
	reducers: {
		addMyChat: (state, action) => {
			state.chat = action.payload;
		},
		addSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
		deleteSelectedChat: (state, action) => {
			state.selectedChat = null;
			const allChat = state.chat.filter(
				(chat) => chat._id !== action.payload
			);
			state.chat = allChat;
		},
		addNewMessageRecieved: (state, action) => {
			if (!state.newMessageRecieved.includes(action.payload)) {
				state.newMessageRecieved = [
					action.payload,
					...state.newMessageRecieved,
				];
			}
		},
		removeNewMessageRecieved: (state, action) => {
			const newMessageRecieved = state.newMessageRecieved.filter(
				(message) => message.chat._id !== action.payload.chat._id
			);
			state.newMessageRecieved = newMessageRecieved;
		},
	},
});

export const {
	addMyChat,
	addSelectedChat,
	deleteSelectedChat,
	addNewMessageRecieved,
	removeNewMessageRecieved,
} = myChatSlice.actions;
export default myChatSlice.reducer;
