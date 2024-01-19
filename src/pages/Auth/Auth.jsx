import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { LoginBG, Logo } from "../../assets";
import { buttonClick } from "../../assets/animations";
import { signInWithGoogle } from "../../untils/helpers";
import { alert } from "../../components/Alert/Alert";
import Register from "./Register";
import Login from "./Login";
import PopupSubmitOTP from "./PopupSubmitOTP";
import { MutatingDots } from "../../components";

function Auth() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  const [popupEmail, setPopupEmail] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `<h1>Welcome </h1>`,
        html: `<h3>Log In Successfully</h3>`,
        showConfirmButton: false,
        timer: 1600,
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert.alertFailedWithTime(
        "Failed To Log In",
        "This Email has not been registered",
        3300,
        "33",
        () => {}
      );
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBG}
        alt="login background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md px-8 gap-6 relative">
        {/* Top logo section */}
        <Link to={"/"} className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-40" alt="logo" />
        </Link>

        {/* welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <div className=" w-full flex flex-col items-center justify-center px-4 md:px-12 pt-4">
          {isSignUp ? (
            <Register
              setIsPopup={setIsPopup}
              setPopupEmail={setPopupEmail}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Login />
          )}
        </div>

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

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-slate-400"></div>
          <p className="text-slate-400">or</p>
          <div className="w-24 h-[1px] rounded-md bg-slate-400"></div>
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
      {/* popup  */}
      {isPopup && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  items-center justify-center w-656 bg-white bg-opacity-90 rounded-xl z-20"
        >
          <PopupSubmitOTP popupEmail={popupEmail} setIsLoading={setIsLoading} />
        </div>
      )}

      {/* loading  */}
      {isLoading && (
        <div className="absolute z-30 bg-white bg-opacity-20 w-full h-full flex items-center justify-center">
          <MutatingDots />
        </div>
      )}
    </div>
  );
}

export default Auth;
