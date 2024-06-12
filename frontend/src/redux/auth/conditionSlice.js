import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isLoading: false,
		isProfileDetail: false,
		isUserSearchBox: false,
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = !state.isLoading;
		},
		setProfileDetail: (state, action) => {
			state.isProfileDetail = !state.isProfileDetail;
		},
		setUserSearchBox: (state, action) => {
			state.isUserSearchBox = !state.isUserSearchBox;
		},
	},
});
export const { setLoading, setProfileDetail, setUserSearchBox } =
	conditionSlice.actions;
export default conditionSlice.reducer;
