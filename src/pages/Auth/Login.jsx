import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";

import UserAuthInput from "./UserAuthInput";
import { alert } from "../../components/Alert/Alert";
import { buttonClick } from "../../assets/animations";
import { loginWithEmailPass } from "../../api";

function Login({ setIsLoading, setIsForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (getEmailValidationStatus) {
      try {
        const data = await loginWithEmailPass(email, password);
        if (data.isSuccess) {
          console.log(data.result.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `<h1>Welcome </h1>`,
            html: `<h3>Log In Successfully</h3>`,
            showConfirmButton: false,
            timer: 1600,
          });
        } else {
          alert.alertFailedWithTime(
            "Failed To Log In",
            "Please check email or password",
            3300,
            "33",
            () => {}
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <p className="text-xl text-textColor -mt-6">Sign in with following</p>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <UserAuthInput
          lable="Email"
          placeHolder="Email"
          isPass={false}
          key="Email"
          setStateFunction={setEmail}
          Icon={FaEnvelope}
          setGetEmailValidationStatus={setGetEmailValidationStatus}
        />

        {/* password */}
        <UserAuthInput
          lable="Password"
          placeHolder="Password"
          isPass={true}
          key="Password"
          setStateFunction={setPassword}
          Icon={MdPassword}
        />

        {/* save me and forgot password  */}
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex items-center w-full md:w-1/2">
            <input
              type="checkbox"
              className="rounded border-gray-500 cursor-pointer w-3 h-3"
            />
            <label className="text-gray-700 ml-2"> Remember Me </label>
          </div>
          <div className="w-full md:w-1/2 text-right">
            <div
              onClick={() => setIsForgot(true)}
              className="text-xs hover:underline text-slate-700 sm:text-sm cursor-pointer"
            >
              Forgot your password?
            </div>
          </div>
        </div>

        {/* button section  */}
        <motion.button
          {...buttonClick}
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize 
        hover:bg-[rgba(249,115,22)] transition-all duration-150 mt-4"
        >
          Sign in
        </motion.button>
      </form>
    </>
  );
}

export default Login;
