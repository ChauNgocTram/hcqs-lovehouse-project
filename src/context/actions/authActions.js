export const setTokens = (accessToken, refreshToken) => ({
    type: 'SET_TOKENS',
    payload: {
        accessToken,
        refreshToken
    },
});

export const logout = () => ({
    type: 'LOGOUT',
});