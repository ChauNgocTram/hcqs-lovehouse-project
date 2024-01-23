import { FaBars } from "react-icons/fa";
import { Avatar, HouseLogo } from "../../assets";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";

function DBHeader() {
  return (
    <div className="flex items-center justify-between w-full bg-white p-4 shadow-md">
      <div className="flex items-center justify-center py-2 ">
        <div className="border border-gray-300 p-2">
          <FaBars className="text-xl" />
        </div>
        <div className="px-2">
          <img src={HouseLogo} alt="logo" className="w-10" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative bg-slate-100 p-2 rounded-full mx-2">
          <IoMdNotificationsOutline className="text-xl" />
          <div className="absolute px-1 py-1 bg-red-600 rounded-full top-0 right-0"></div>
        </div>
        <div className="relative bg-slate-100 p-2 rounded-full mx-2">
          <AiOutlineMessage className="text-xl" />
          <div className="absolute px-1 py-1 bg-red-600 rounded-full top-0 right-0"></div>
        </div>
        <div className="mx-4">
          <img src={Avatar} alt="avatar" className="w-12" />
        </div>
      </div>
    </div>
  );
}

export default DBHeader;
