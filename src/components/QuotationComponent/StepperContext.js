// import { createContext } from "react";

// export const StepperContext = createContext(null);

// StepperContext.js
import React, { createContext, useContext } from "react";

export const StepperContext = createContext(null);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within a StepperContext.Provider");
  }
  return context;
};
