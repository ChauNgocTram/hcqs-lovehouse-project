import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getTotalProjects = async () => {
    try {
        const res = await axios.post(`${baseURL}/statistic/get-total-project`, {});
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getTotalQuotes = async () => {
    try {
        const res = await axios.post(`${baseURL}/statistic/get-total-quotation-request`, {});
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getTotalAccountByRole = async () => {
    try {
        const res = await axios.post(`${baseURL}/statistic/get-account-ratio`, {});
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getConstructionType = async ({ timePeriod, year }) => {
    try {
      const res = await axios.post(
        `${baseURL}/statistic/get-project-construction-type-ratio?year=${year}&timePeriod=${timePeriod}`,
        {
            headers: {
                Authorization: `Bearer ${usertoken}`,
              },
              withCredentials: true,
        }
      );
  
      return res.data;
    } catch (err) {
      console.error("Error dealing with quotation:", err);
      throw err;
    }
  };