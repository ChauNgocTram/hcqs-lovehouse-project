import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net/";

export const getAllNews = async (fieldName, ascending) => {
  try {
    const res = await axios.post(`${baseURL}/news/get-all`, []);
    return res.data;
  } catch (err) {
    return null;
  }
};