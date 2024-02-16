import axios from "axios";

const baseURL = "https://hcqs-backend.azurewebsites.net";
export const usertoken = localStorage.accessToken;

export const quoteRequest = async (userData, accountId) => {
  try {
    const formData = new FormData();

   
    formData.append("NumOfFloor", userData.numOfFloor);
    formData.append("Area", userData.area);
    formData.append("LandDrawingFile", userData.landDrawingFileUrl); 
    formData.append("Type", userData.constructionType);
    formData.append("AccountId", accountId);
 

 
    const res = await axios.post(`${baseURL}/project/create-project-by-user`, formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, 
         "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    return null;
  }
};


export const getAllRequest = async (accountId) => {
  try {
      const res = await axios.get(`${baseURL}/project/get-all-project-by-accountId/${accountId}`,
      {
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

export const getProjectByIdForCustomer = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/project/get-project-by-id-for-customer/${id}`, {
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

export const getQuoteDetailForCustomer = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/quotation/get-quotation-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const createQuotationDealRequest = async (createData) => {
  try {
    const res = await axios.post(
      `${baseURL}/quotation/create-quotation-dealing-request`,
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
    console.error("Error create quotation detail:", err);
    throw err;
  }
};

export const dealQuotation = async (createData) => {
  try {
    const { status, stringValue } = createData;

    if (status === undefined || stringValue === undefined) {
      throw new Error("Both 'status' and 'stringValue' are required in createData");
    }

    const res = await axios.post(
      `${baseURL}/quotation/deal-quotation`,
      {
        status,
        stringValue,
      },
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
