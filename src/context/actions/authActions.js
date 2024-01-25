export const setTokens = (accessToken, refreshToken) => ({
    type: 'SET_TOKENS',
    payload: {
        accessToken,
        refreshToken,
    },
});

export const setUserRole = (role) => ({
    type: 'SET_USER_ROLE',
    payload: role,
});

export const logout = () => ({
    type: 'LOGOUT',
});