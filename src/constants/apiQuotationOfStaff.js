import axios from "axios";
const baseURL = "https://hcqs-backend.azurewebsites.net";

export const getAllRequestForStaff = async (fieldName, ascending) => {
  try {
      const res = await axios.get(`${baseURL}/project/get-all-project`, []);
      return res.data;
  } catch (err) {
      return null;
  }
};

export const getProjectById = async (id) => {
  try {
      const res = await axios.get(`${baseURL}/project/get-project-by-id/${id}`);
      return res.data;
  } catch (err) {
      return null;
  }
};

// export const configProject = async (accountId,userData) => {
//   try {
//     const formData = new FormData();

   
//     formData.append("id", accountId);
//     formData.append("sandMixingRatio", userData.sandMixingRatio);
//     formData.append("cementMixingRatio", userData.cementMixingRatio); 
//     formData.append("stoneMixingRatio", userData.stoneMixingRatio);
//     formData.append("furnitureDiscount", userData.furnitureDiscount);
//     formData.append("laborPrice", userData.laborPrice);
//     formData.append("laborDiscount", userData.laborDiscount);
//     formData.append("tiledArea", userData.tiledArea);
//     formData.append("wallLength", userData.wallLength);
//     formData.append("wallHeight", userData.wallHeight);
//     formData.append("estimatedTimeOfCompletion", userData.estimatedTimeOfCompletion);

//     const laborRequests = [{
//       "exportLaborCost": userData.exportLaborCost,
//       "quantity": userData.quantity,
//       "workerPriceId": userData.workerPriceId
//     }];

//     formData.append("laborRequests", JSON.stringify(laborRequests));
 
//     const res = await axios.put(`${baseURL}/project/config-project`,formData);

//     return res.data;
//   } catch (err) {
//     return null;
//   }
// };


export const updateProjectConfig = async (updateData) => {
  try {
    const res = await axios.put(`${baseURL}/project/config-project`, updateData, {
      // Các cấu hình khác nếu cần
    });

    return res.data;
  } catch (err) {
    console.error('Error updating project config:', err);
    throw err; // Ném lại lỗi để xử lý ở phần gọi API
  }
};