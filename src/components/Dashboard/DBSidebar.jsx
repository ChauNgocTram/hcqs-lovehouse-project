import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";

import { slideUpOut } from "../../assets/animations";
import { HouseLogo, isActiveStyles, isNotActiveStyles } from "../../assets";

function DBSidebar() {
  const [isDashboard, setIsDashboard] = useState(true);
  const [isUser, setIsUser] = useState(true);

  return (
    <div
      className="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden 
      bg-baseDashboard duration-300 ease-linear lg:static lg:translate-x-0 -translate-x-full"
    >
      <div className="items-center justify-between px-6 py-5.5 lg:py-6.5">
        {/* logo  */}
        <div className="flex justify-between items-center py-4">
          <Link to={"/"} className="flex items-center text-white">
            <img src={HouseLogo} alt="logo" className="w-10" />
            <p className="px-2 text-xl">Love House</p>
          </Link>
          <div className="text-white">
            <FaArrowLeft />
          </div>
        </div>

        {/* Menu  */}
        <div className="pl-2 pt-6 text-slate-200">
          <div className="pt-4">
            <p className="text-slate-400 uppercase font-semibold py-2">Menu</p>

            {/* dashboard  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start py-2">
                <IoGridOutline className="" />
                <div className="pl-2">Dashboard</div>
              </div>
              <div
                onClick={() => {
                  setIsDashboard(!isDashboard);
                }}
              >
                {isDashboard ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* navlink  */}
            {!isDashboard && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Users
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* user management  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start py-2">
                <IoGridOutline className="" />
                <div className="pl-2">User Management</div>
              </div>
              <div
                onClick={() => {
                  setIsUser(!isUser);
                }}
              >
                {isUser ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* navlink  */}
            {!isUser && (
              <>
                <motion.div {...slideUpOut} className={`flex flex-col `}>
                  <NavLink
                    to={"/user-listt"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Users List
                  </NavLink>
                  <NavLink
                    to={"/create-user"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Create User
                  </NavLink>
                  <NavLink
                    to={"/staff"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Staff Activity
                  </NavLink>
                  <NavLink
                    to={"/role"}
                    className={({ isActive }) =>
                      isActive
                        ? `${isActiveStyles} px-4 py-2 border-l-8  border-slate-600 hover:bg-slate-200 hover:bg-opacity-50  pl-16 p-2w-full font-semibold `
                        : isNotActiveStyles
                    }
                  >
                    Role Permission
                  </NavLink>
                </motion.div>
              </>
            )}

            {/* Calendar  */}
            <NavLink
              to={"/calendar"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <FaRegCalendarAlt className="" />
              <div className="pl-2">Calendar</div>
            </NavLink>

            {/* Setting  */}
            <NavLink
              to={"/setting"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <CiSettings className="text-xl" />
              <div className="pl-2">Setting</div>
            </NavLink>
          </div>
        </div>

        {/* Other  */}
        <div className="pl-2 pt-6 text-slate-200">
          {/* Menu  */}
          <div className="pt-4">
            <p className="text-slate-400 uppercase font-semibold py-2">Other</p>

            {/* Chart  */}
            <NavLink
              to={"/calendar"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center justify-start py-2 pl-8 text-xl border-l-8  border-slate-600"
                  : "flex items-center justify-start py-2"
              }
            >
              <AiOutlinePieChart className="text-xl" />
              <div className="pl-2">Chart</div>
            </NavLink>

            {/* logout  */}
            <div className="flex items-center justify-start py-2">
              <MdLogout className="text-xl" />
              <div className="pl-2">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBSidebar;
