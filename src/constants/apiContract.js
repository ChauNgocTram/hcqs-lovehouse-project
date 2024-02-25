import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const getContractProgressById = async (contractId) => {
    try {
      const res = await axios.get(`${baseURL}/contract-progress-payment/get-contract-progress-payment-by-contractId/${contractId}`, {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return null;
    }
  };
  

  export const createContractProgress = async (createData) => {
    try {
      const res = await axios.post(
        `${baseURL}/contract-progress-payment/create-contract-progress-payment`,
        createData,
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
          withCredentials: true,
        }
      );
  
      return res.data;
    } catch (err) {
      console.error("Error create contract progress:", err);
      throw err;
    }
  };