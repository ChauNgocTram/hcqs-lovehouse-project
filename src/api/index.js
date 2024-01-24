import axios from "axios";
export const baseURL = "https://hcqs-backend.azurewebsites.net/";

//account
export {
    activeAccount,
    getAccountById,
    getNewToken,
    createAccount,
    googleCallback,
    loginWithEmailPass,
    sendOTP,
    sendResetPassOTP,
    submitOTPResetPass
}
from "./account";

export const getAllAccount = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(`${baseURL}/account/get-all-account?pageIndex=${pageIndex}&pageSize=${pageSize}`, []);
        return res.data;
    } catch (err) {
        return null;
    }
};