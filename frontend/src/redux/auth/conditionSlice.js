import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isLoading: false,
		isChatLoading: false,
		isMessageLoading: false,
		isSendLoading: false,
		isProfileDetail: false,
		isHeaderMenu: false,
		isChatMenuBtn: false,
		isUserSearchBox: false,
		isGroupChatBox: false,
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setChatLoading: (state, action) => {
			state.isChatLoading = action.payload;
		},
		setMessageLoading: (state, action) => {
			state.isMessageLoading = action.payload;
		},
		setSendLoading: (state, action) => {
			state.isSendLoading = action.payload;
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
		setGroupChatBox: (state, action) => {
			state.isGroupChatBox = !state.isGroupChatBox;
		},
	},
});
export const {
	setLoading,
	setChatLoading,
	setMessageLoading,
	setSendLoading,
	setProfileDetail,
	setHeaderMenu,
	setChatMenuBtn,
	setUserSearchBox,
	setGroupChatBox,
} = conditionSlice.actions;
export default conditionSlice.reducer;
