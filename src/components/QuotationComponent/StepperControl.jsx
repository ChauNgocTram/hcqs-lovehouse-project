// import React from "react";

// export default function StepperControl({ handleClick, currentStep, steps }) {
//   return (
//     <>
//       <div className="container flex justify-around mt-4 mb-8">
//         <button
//           onClick={() => handleClick()}
//           className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
//             currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           Back
//         </button>

//         <button
//           onClick={() => handleClick("next")}
//           className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
//         >
//           {currentStep === steps.length - 1 ? "Confirm" : "Next"}
//         </button>
//       </div>
//     </>
//   );
// }


import React, { useContext } from "react";
import { StepperContext } from "./StepperContext";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  const { formik } = useContext(StepperContext);

  const handleNextClick = () => {
    // Check if the form is valid
    formik.validateForm().then((errors) => {
      // If there are errors, display them and prevent step change
      if (Object.keys(errors).length > 0) {
        formik.setTouched(Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}));
      } else {
        // If the form is valid, proceed with the next step
        handleClick("next");
      }
    });
  };

  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={() => handleClick()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>

      <button
        onClick={handleNextClick}
        className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;

