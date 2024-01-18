import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";

import UserAuthInput from "./UserAuthInput";
import { buttonClick } from "../../assets/animations";
import { loginWithEmailPass } from "../../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleLogin = async () => {
    if (getEmailValidationStatus) {
      await loginWithEmailPass(email, password)
        .then((data) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
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
        onClick={handleLogin}
        className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize hover:bg-[rgba(249,115,22)] transition-all duration-150"
      >
        Sign in
      </motion.button>
    </>
  );
}

export default Login;
