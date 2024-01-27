export const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

//account
export {
    createAccount,
    getAccountById,
    getAllAccount,
    getNewToken,
    activeAccount,
    googleCallback,
    loginWithEmailPass,
    sendOTP,
    sendResetPassOTP,
    submitOTPResetPass,
}
from "./account";

//news
export {
    createNews,
    getNewsById,
    getAllNews,
    updateNews,
    deleteNewsById
}
from "./news";

//blog
export {
    createBlog,
    getBlogById,
    getAllBlog,
    updateBlog,
    deleteBlogById
}
from "./blog";