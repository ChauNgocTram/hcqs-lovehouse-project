import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline, MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { buttonClick } from "../../assets/animations";
import { createAccount } from "../../api";
import UserAuthInput from "./UserAuthInput";

function Register({ setIsPopup, setPopupEmail, setIsLoading }) {
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(true);
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value === "true";
    setGender(selectedGender);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  const handleSignUp = async () => {
    if (getEmailValidationStatus) {
      setIsLoading(true);
      try {
        const result = await createAccount(
          email,
          fristName,
          lastName,
          password,
          gender,
          phoneNumber,
          "Admin"
        );
        console.log("Register result: ", result);
        if (result.isSuccess === true) {
          setIsPopup(true);
          setPopupEmail(email);
          toast.success("Registration successful! Please verificate email.");
        } else {
          console.error(
            "Registration failed:",
            result ? result.message : "Unknown error"
          );
          toast.error("Registration failed. Please try again.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <p className="text-xl text-textColor -mt-6">Sign Up with following</p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full md:w-96">
          {/* frist name  */}
          <UserAuthInput
            lable="Frist Name"
            placeHolder="Frist Name"
            isPass={false}
            key="FristName"
            setStateFunction={setFristName}
            Icon={MdOutlineDriveFileRenameOutline}
          />

          {/* Last name  */}
          <UserAuthInput
            lable="Last Name"
            placeHolder="Last Name"
            isPass={false}
            key="LastName"
            setStateFunction={setLastName}
            Icon={MdOutlineDriveFileRenameOutline}
          />
        </div>

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

        {/* phone number */}
        <UserAuthInput
          lable="Phone Number"
          placeHolder="012......"
          isPass={false}
          key="PhoneNumber"
          setStateFunction={setPhoneNumber}
          Icon={FaEnvelope}
          setGetEmailValidationStatus={setGetEmailValidationStatus}
        />

        {/* gender  */}
        <div className="flex flex-col items-start justify-start gap-1">
          <label className="text-sm text-gray-700">
            Gender<span className="text-red-500 required-dot">*</span>
          </label>
          <select
            className="border border-gray-500 flex items-center justify-center gap-3
            w-full md:w-96 rounded-md px-4 py-3 bg-gray-200 bg-transparent outline-none selection:text-2xl"
            defaultValue="true"
            onChange={handleGenderChange}
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>

        {/* password */}
        <UserAuthInput
          lable="Password"
          placeHolder="Password"
          isPass={true}
          key="Password"
          setStateFunction={setPassword}
          Icon={MdPassword}
        />

        {/* confirm password  */}
        <UserAuthInput
          lable="Confirm Password"
          placeHolder="Confirm Password"
          isPass={true}
          key="ConfirmPassword"
          setStateFunction={setPassword}
          Icon={MdPassword}
        />

        {/* button section  */}
        <motion.button
          {...buttonClick}
          className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize
        hover:bg-[rgba(249,115,22)] transition-all duration-150 mt-4"
          type="submit"
        >
          Sign Up
        </motion.button>
      </form>
    </>
  );
}

export default Register;
