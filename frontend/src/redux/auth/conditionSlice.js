import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isLoading: false,
		isProfileDetail: false,
		isUserSearchBox: false,
		selectedChat: "",
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setProfileDetail: (state, action) => {
			state.isProfileDetail = !state.isProfileDetail;
		},
		setUserSearchBox: (state, action) => {
			state.isUserSearchBox = !state.isUserSearchBox;
		},
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
	},
});
export const {
	setLoading,
	setProfileDetail,
	setUserSearchBox,
	setSelectedChat,
} = conditionSlice.actions;
export default conditionSlice.reducer;
