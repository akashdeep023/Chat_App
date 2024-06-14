import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isLoading: false,
		isChatLoading: false,
		isProfileDetail: false,
		isHeaderMenu: false,
		isChatMenuBtn: false,
		isUserSearchBox: false,
		selectedChat: "",
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setChatLoading: (state, action) => {
			state.isChatLoading = action.payload;
		},
		setProfileDetail: (state, action) => {
			state.isProfileDetail = !state.isProfileDetail;
		},
		setHeaderMenu: (state, action) => {
			state.isHeaderMenu = action.payload;
			state.isChatMenuBtn = false;
		},
		setChatMenuBtn: (state, action) => {
			state.isHeaderMenu = false;
			state.isChatMenuBtn = action.payload;
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
	setChatLoading,
	setProfileDetail,
	setHeaderMenu,
	setChatMenuBtn,
	setUserSearchBox,
	setSelectedChat,
} = conditionSlice.actions;
export default conditionSlice.reducer;
