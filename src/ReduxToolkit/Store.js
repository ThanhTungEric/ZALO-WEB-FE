import { configureStore } from '@reduxjs/toolkit';
import userReducer from './ActionAndRedux';

const store = configureStore({
    reducer: {
        users: userReducer,
    }
});

export default store;
