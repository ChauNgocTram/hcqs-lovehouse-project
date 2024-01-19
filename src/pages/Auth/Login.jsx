import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";

import UserAuthInput from "./UserAuthInput";
import { alert } from "../../components/Alert/Alert";
import { buttonClick } from "../../assets/animations";
import { loginWithEmailPass } from "../../api";

function Login({ setIsLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action
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
    <form onSubmit={handleSubmit}>
      <p className="text-xl text-textColor -mt-6">Sign in with following</p>
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
  );
}

export default Login;
