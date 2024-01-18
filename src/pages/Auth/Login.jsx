import { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaEnvelope } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import UserAuthInput from "./UserAuthInput";
import { LoginBG, Logo } from "../../assets";
import { buttonClick } from "../../assets/animations";
import { signInWithGoogle } from "../../untils/helpers";
import { loginWithEmailPass } from "../../api";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);

  const [name, setName] = useState("");
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Successfully signed in with Google", "success");
    } catch (error) {
      toast.error("Error signing in with Google", "error");
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogin = async () => {
    if (getEmailValidationStatus) {
      await loginWithEmailPass(email, password)
        .then((data) => {
          if (data.isSuccess) {
            console.log(data.result.data);
            toast.success("Login successful.");
          } else {
            toast.error("Login fail!. Please check email or password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBG}
        alt="login background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* Top logo section */}
        <Link to={"/"} className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-40" alt="logo" />
        </Link>

        {/* welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>
        <div className=" w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          {/* name  */}
          {isSignUp && (
            <>
              <UserAuthInput
                label="Frist Name"
                placeholder="Your frist name"
                isPass={false}
                setStateFunction={setName}
                Icon={RxAvatar}
              />

              <UserAuthInput
                label="Last Name"
                placeholder="Your last name"
                isPass={false}
                setStateFunction={setName}
                Icon={RxAvatar}
              />
            </>
          )}

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

          {isSignUp && (
            <UserAuthInput
              lable="Confirm Password"
              placeHolder="Confirm Password"
              isPass={true}
              key="ConfirmPassword" // Changed key here
              setStateFunction={setPassword}
              Icon={MdPassword}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-[rgba(251,146,60)] underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-[rgba(251,146,60)] underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}
          {/* button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize hover:bg-[rgba(249,115,22)] transition-all duration-150"
              // onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={handleLogin}
              className="w-full px-4 py-2 rounded-md bg-[rgba(251,146,60)] cursor-pointer text-white text-xl capitalize hover:bg-[rgba(249,115,22)] transition-all duration-150"
            >
              Sign in
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
