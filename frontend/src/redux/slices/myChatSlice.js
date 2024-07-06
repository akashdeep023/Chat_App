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
    addNewMessageRecieved,
    removeNewMessageRecieved,
} = myChatSlice.actions;
export default myChatSlice.reducer;
