import { useState } from "react";
import mainlogo from "../../assets/images/mainlogo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import BtnLoginRegister from "../Button/BtnLoginRegister";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="navbar relative px-4 py-4 flex justify-between items-center h-24 mx-auto uppercase text-white bg-baseOrange">
      <NavLink to="/">
        <img src={mainlogo} alt="" className="h-80 w-200 m-3 " />
      </NavLink>

      <ul className="hidden md:flex">
      <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/aboutus">About Us</NavLink>
          </li>
          <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/quotation">Construction Quotes</NavLink>
          </li>
          <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/news">News</NavLink>
          </li>
          <li className="p-4 hover:underline underline-offset-8">
            <NavLink to="/blog">Blogs</NavLink>
          </li>
      </ul>

      <div className="hidden md:flex">
        <BtnLoginRegister />
      </div>
      {/* <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" className="w-[40px] rounded-full"/> */}

      <div onClick={handleNav} className="block md:hidden px-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-baseOrange ease-in-out duration-500 "
            : "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-baseOrange ease-in-out duration-500"
        }
      >
        <NavLink to="/">
          <img src={mainlogo} alt="" className="h-80 w-200 m-3" />
        </NavLink>

        <ul className=" uppercase p-4">
          <li className="p-4">
            <NavLink to="/" >Home</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/aboutus">About Us</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/projects">Project</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/quotation">Construction Quotes</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/news">News</NavLink>
          </li>
          <li className="p-4">
            <NavLink to="/blog">Blogs</NavLink>
          </li>
        </ul>

        <div className="flex justify-center uppercase mt-6">
          <BtnLoginRegister />
        </div>
      </div>
    </div>
  );
}
