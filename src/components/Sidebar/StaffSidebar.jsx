import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  RiMailSendFill,
  RiLogoutCircleRLine,
  RiHome4Line,
  RiWallet3Line,
} from "react-icons/ri";
import {
  FaBlog,
  FaChevronDown,
  FaChevronUp,
  FaRegCircleUser,
  FaRegNewspaper,
} from "react-icons/fa6";
import { MdInventory, MdOutlinePriceChange } from "react-icons/md";
import { GrSupport, GrTransaction } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { SiMaterialdesignicons } from "react-icons/si";

import control from "../../assets/images/control.png";
import HouseLogo from "../../assets/images/HouseLogo.png";
import { BiSolidDetail } from "react-icons/bi";
import { IoPricetagsSharp } from "react-icons/io5";

export default function StaffSidebar() {
  const [open, setOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const Menus = [
    {
      title: "Quote Request",
      icon: <RiMailSendFill />,
      path: "/staff/all-request",
    },
    {
      label: "MENU",
    },
    {
      title: "User Management",
      icon: <FaRegCircleUser />,
      submenu: [
        { title: "Users List", path: "/users-list" },
        { title: "Create User", path: "/create-user" },
        { title: "Staff Activity", path: "/staff-activity" },
        { title: "Role Permission", path: "/role-permission" },
      ],
    },
    { title: "Calendar ", icon: <FaRegCalendarAlt /> },

    {
      label: "FUNC TION",
    },
    {
      title: "House Project Page",
      icon: <AiOutlineProject />,
      submenu: [
        { title: "Create Project", path: "/create-sample-project" },
        { title: "Project List", path: "/list-project" },
      ],
    },
    {
      title: "News Management",
      icon: <FaRegNewspaper />,
      submenu: [
        { title: "Create News", path: "/create-news" },
        { title: "News List", path: "/list-news" },
      ],
    },
    {
      title: "Blogs Management",
      icon: <FaBlog />,
      submenu: [
        { title: "Create Blog", path: "/create-blog" },
        { title: "Blog List", path: "/list-blog" },
      ],
    },

    {
      label: "IMPORT EXPORT",
    },
    {
      title: "Inventory",
      icon: <MdInventory />,
      submenu: [
        { title: "Import Inventory", path: "/import-inventory" },
        { title: "Export Inventory", path: "/export-inventory" },
      ],
    },
    {
      title: "Material",
      icon: <SiMaterialdesignicons />,
      submenu: [{ title: "Material List", path: "/list-material" }],
    },
    {
      title: "Supplier",
      icon: <GrSupport />,
      submenu: [{ title: "View Supplier", path: "/view-supplier" }],
    },
    {
      title: "Supplier Price Detail",
      icon: <BiSolidDetail />,
      submenu: [{ title: "View Supplier Price", path: "/view-supplier-price" }],
    },
    {
      title: "Supplier Price Quotation",
      icon: <IoPricetagsSharp />,
      submenu: [
        { title: "Import Quotation", path: "/import-quotation" },
        { title: "Quotation List", path: "/list-quotation" },
      ],
    },
    {
      label: "OTHER",
    },
    { title: "Transaction ", icon: <RiWallet3Line /> },
    { title: "Go to Home page", icon: <RiHome4Line />, path: "/" },
    { title: "Setting ", icon: <RiWallet3Line /> },
    { title: "Log out", icon: <RiLogoutCircleRLine /> },
  ];

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <div className="flex w-72.5 overflow-y-auto duration-300 ease-linear scrollbar-thin scrollbar-none scrollbar-track-gray-100">
      <div
        className={`${
          open ? "w-64" : "w-28"
        } bg-white h-screen p-5 pt-7 relative duration-300`}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex gap-x-4 items-center">
            <img
              src={HouseLogo}
              className={`cursor-pointer duration-500 w-10 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && "hidden"
              }`}
            >
              LoveHouse
            </h1>
          </NavLink>
          <img
            src={control}
            className={`z-50 cursor-pointer top-9 w-7  border-baseGreen
     border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.label ? (
                <li
                  key={`label-${index}`}
                  className="text-gray-500 uppercase font-bold text-md mb-2 mt-8"
                >
                  {menu.label}
                </li>
              ) : (
                <>
                  <li
                    key={index}
                    onClick={() => toggleSubMenu(index)}
                    className={`flex rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4 
                    ${menu.gap ? "mt-9" : "mt-2"} ${
                      index === 0 && "bg-baseGreen text-white"
                    } `}
                  >
                    <span style={{ fontSize: "24px" }}>{menu.icon}</span>
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menu.title}
                    </span>
                    {menu.submenu && (
                      <span className={`ml-auto ${open ? "block" : "hidden"}`}>
                        {activeSubMenu === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    )}
                  </li>
                  {menu.submenu && activeSubMenu === index && (
                    <ul className={`pl-6 ${open ? "block" : "hidden"}`}>
                      {menu.submenu.map((submenu, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={submenu.path}
                          className="text-decoration-none"
                        >
                          <li className="flex rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4">
                            <span style={{ fontSize: "24px" }}>&nbsp;</span>
                            <span
                              className={`${
                                !open && "hidden"
                              } origin-left duration-200`}
                            >
                              {submenu.title}
                            </span>
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
