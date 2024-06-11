import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
	name: "condition",
	initialState: {
		isProfileDetail: false,
	},
	reducers: {
		setProfileDetail: (state, action) => {
			state.isProfileDetail = !state.isProfileDetail;
		},
	},
});
export const { setProfileDetail } = conditionSlice.actions;
export default conditionSlice.reducer;
