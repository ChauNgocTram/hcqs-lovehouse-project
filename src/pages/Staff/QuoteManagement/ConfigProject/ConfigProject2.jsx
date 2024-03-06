import React from "react";
import ConfigForm from "./ConfigForm";
import { DBHeader, StaffSidebar } from "../../../../components";

const ConfigProject2 = () => {
  return (
    <>
      <div className="mx-auto px-5 h-screen">
        <h1 className="mt-6 text-2xl font-semibold uppercase text-center ">
          Config Form
        </h1>

        <ConfigForm />
      </div>
    </>
  );
};
export default ConfigProject2;
