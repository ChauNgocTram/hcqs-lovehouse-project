import React from "react";
import ConstructionTypeChart from "./Chart/ConstructionTypeChart";

function Chart() {
  return (
    <>
      <div className="flex mt-[22px] w-full gap-[30px] px-5 pb-5 sm:flex-col md:flex-row">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div>
            <h2>Overview</h2>
          </div>
        </div>

        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Construction Type</h2>
          </div>

          <div>
            <ConstructionTypeChart/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
