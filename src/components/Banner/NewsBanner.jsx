import React from "react";

export default function NewsBanner() {
  return (
    <div
      className="relative bg-cover bg-no-repeat bg-center pt-28 mb-10 h-[330px]"
      style={{
        backgroundImage: `url(https://mhomevietnam.vn/vnt_upload/weblink/bgwhy.jpg)`,
      }}
    >
      <div className="absolute bg-black opacity-50 inset-0 flex flex-col items-center justify-center">
        <div
          className="text-white uppercase h-[330px] font-bold text-4xl absolute  inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          LOVEHOUSE'S News
        </div>
      </div>
    </div>
  );
}
