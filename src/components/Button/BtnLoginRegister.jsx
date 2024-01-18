import { NavLink } from "react-router-dom";
export default function BtnLoginRegister() {
  return (
    <>
      <NavLink to={"/login"}>
        <button className="px-4 uppercase hover:bg-dark font-mediums rounded-md my-6 mx-auto py-3 transition duration-200">
          Sign In
        </button>
      </NavLink>
      <NavLink to={"/register"}>
        <button className="px-4 uppercase bg-white text-dark font-bold rounded-md my-6 mr-6 mx-auto py-3">
          Sign Up
        </button>
      </NavLink>
    </>
  );
}
