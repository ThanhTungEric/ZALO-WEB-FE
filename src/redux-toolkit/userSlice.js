import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.user = {};
        },
        selectUser: (state) => state.user,
    },
    });
export const { login, logout, selectUser } = userSlice.actions;
export default userSlice.reducer;