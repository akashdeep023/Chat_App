import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: [],
        newMessageId: "",
    },
    reducers: {
        addAllMessages: (state, action) => {
            state.message = action.payload;
        },
        addNewMessage: (state, action) => {
            state.message = [...state.message, action.payload];
        },
        addNewMessageId: (state, action) => {
            state.newMessageId = action.payload;
        },
    },
});

export const { addAllMessages, addNewMessage, addNewMessageId } =
    messageSlice.actions;
export default messageSlice.reducer;
