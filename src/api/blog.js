import axios from "axios";
import {
    baseURL,
    usertoken
} from ".";

export const getAllBlog = async (pageIndex, pageSize) => {
    try {
        const res = await axios.post(
            `${baseURL}/blog/get-all?pageIndex=${pageIndex}&pageSize=${pageSize}`, [], {
                headers: {
                    Authorization: `Bearer ${usertoken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (err) {
        return null;
    }
};