import React from "react";
import ConfigForm from "./ConfigForm";
import { updateProjectConfig } from "../../../constants/apiQuotationOfStaff";

const ConfigProject2 = () => {
  const initialValues = {
    id: "",
    sandMixingRatio: 0,
    cementMixingRatio: 0,
    stoneMixingRatio: 0,
    furnitureDiscount: 0,
    laborPrice: 0,
    laborDiscount: 0,
    tiledArea: 0,
    wallLength: 0,
    wallHeight: 0,
    estimatedTimeOfCompletion: 0,
    laborRequests: [
      {
        exportLaborCost: 0,
        quantity: 0,
        workerPriceId: "",
      },
    ],
  };

  const handleSubmit = async (values) => {
    try {
        values.laborRequests[0].workerPriceId = values.laborRequests[0].id;
      const response = await updateProjectConfig(values);
      console.log('API Response:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Your Form</h1>
      <ConfigForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};
export default ConfigProject2;
