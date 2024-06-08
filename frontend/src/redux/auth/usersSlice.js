import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
	},
	reducers: {
		addAllUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const { addAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
