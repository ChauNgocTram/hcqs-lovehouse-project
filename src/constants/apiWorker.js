import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getAllWorker = async (fieldName, ascending) => {
  try {
    const res = await axios.get(`${baseURL}/worker/get-all`, {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      withCredentials: true,
    });

    // Extracting the data array from the response
    const workerData = res.data.result.data;

    return workerData;
  } catch (err) {
    return null;
  }
};
