import axios from "axios";
const baseURL = "https://hcqs.azurewebsites.net";

export const getAllNews = async (fieldName, ascending) => {
  try {
      const res = await axios.post(`${baseURL}/news/get-all`, []);
      return res.data;
  } catch (err) {
      return null;
  }
};

export const getNewsDetail = async (id) => {
  try {
      const res = await axios.get(`${baseURL}/news/get-news-by-id/${id}`);
      return res.data;
  } catch (err) {
      return null;
  }
};