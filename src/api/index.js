export const baseURL = "https://hcqs-backend.azurewebsites.net/";
export const usertoken = localStorage.accessToken;

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
    submitOTPResetPass,
    getAllAccount
}
from "./account";

//news
export {
    getAllNews,
    createNews,
    updateNews,
    deleteNewsById
}
from "./news";

//blog
export {
    getAllBlog
}
from "./blog";