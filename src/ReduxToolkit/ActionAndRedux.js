import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// get user by number phone from server
export const fetchUserByNumberPhone = createAsyncThunk(
    'user/fetchByNumberPhone', async ({ phoneNumber, password }) => {
        const response = await fetch(`http://localhost:8080/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber, password })
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
);


//reducers
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByNumberPhone.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder
            .addCase(fetchUserByNumberPhone.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            });
        builder
            .addCase(fetchUserByNumberPhone.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;