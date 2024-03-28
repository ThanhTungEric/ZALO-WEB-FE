
//actions
// export const loginUser = (userData) => {
//     return {
//         type: 'LOGIN_USER',
//         payload: userData
//     };
// };
export const loginUser = (userData) => {
    return {
        type: 'LOGIN_USER',
        payload: userData
    };
};

const initialState = {
    loggedInUser: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                loggedInUser: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;

export const selectLoggedInUser = (state) => state.users.loggedInUser;

