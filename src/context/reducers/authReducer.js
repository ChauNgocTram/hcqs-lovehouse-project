const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    userRole: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKENS':
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
            };
        case 'SET_USER_ROLE':
            return {
                ...state,
                userRole: action.payload,
            };
        case 'LOGOUT':
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                accessToken: null,
                    refreshToken: null,
                    userRole: null,
            };
        default:
            return state;
    }
};

export default authReducer;