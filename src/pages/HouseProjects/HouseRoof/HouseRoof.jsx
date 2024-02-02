import React from "react";
import { IoHomeOutline } from "react-icons/io5";

export default function HouseRoof({ sampleProject = {}, staticFile }) {
  const { location, header, totalArea, estimatePrice } = sampleProject;

  const url = staticFile && staticFile.length > 0 ? staticFile[0].url : null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
      <img
        src={url}
        alt=""
        className="mb-8 rounded-tl-[90px] rounded-br-[90px]"
      />
      <div className="mb-4 flex gap-x-2 text-sm">
        <div className="bg-green-500 rounded-full text-white px-3">
          {location}
        </div>
      </div>

      <div className="text-lg font-semibold max-w-[260px]">{header}</div>

      <div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <IoHomeOutline />
          </div>
          <div>{totalArea} m&#178;</div>
        </div>
      </div>

      <div className="text-lg font-semibold text-red-500 mb-4">
        {formatCurrency(estimatePrice)}
      </div>
    </div>
  );
}
