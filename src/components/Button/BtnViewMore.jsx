import React from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";

function BtnViewMore() {
  return (
    <button className="flex items-center hover:text-orange my-2 py-3 transition duration-200">
      <RiMenuUnfoldFill size={40} className="text-orange pr-2"/>
      View more
    </button>
  );
}

export default BtnViewMore;
