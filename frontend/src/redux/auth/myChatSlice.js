import { createSlice } from "@reduxjs/toolkit";

const myChatSlice = createSlice({
	name: "myChat",
	initialState: {
		chat: [],
	},
	reducers: {
		addMyChat: (state, action) => {
			state.chat = action.payload;
		},
	},
});

export const { addMyChat } = myChatSlice.actions;
export default myChatSlice.reducer;
