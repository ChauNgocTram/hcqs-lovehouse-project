import axios from "axios";
export const baseURL = "https://hcqs.azurewebsites.net";

export const createAccount = async (email, firstName, lastName, password, gender, phoneNumber, roleName) => {
    try {
        const res = await axios.post(`${baseURL}/account/create-account`, {
            email,
            firstName,
            lastName,
            password,
            gender,
            phoneNumber,
            roleName
        });
        return res.data;
    } catch (err) {
        return null;
    }
};

export const googleCallback = async (token) => {
    try {
        const res = await axios.post(`${baseURL}/account/google-callback?accessTokenFromGoogle=${token}`);
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getNewToken = async (accountId, refreshToken) => {
    try {
        const res = await axios.post(`${baseURL}/account/get-new-token?userId=${accountId}`, refreshToken);
        return res.data;
    } catch (err) {
        return null;
    }
};
export const getAccountById = async (accountId, token) => {
    try {
        const res = await axios.post(
            `${baseURL}/account/get-account-by-id/${accountId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (err) {
        console.error('Error fetching account by ID:', err);
        return null;
    }
};