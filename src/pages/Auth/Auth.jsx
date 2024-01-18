import { useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { LoginBG } from "../../assets";
import { auth } from "../../config/firebase.config";

function Auth() {
  const googleProider = new GoogleAuthProvider();

  const handleLoginAction = useCallback(async () => {
    try {
      const userCred = await signInWithRedirect(auth, googleProider);
      if (userCred) {
        console.log("userCred: ", userCred);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  }, [auth, googleProider]);

  return (
    <div
      style={{
        background: `url(${LoginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen flex items-center justify-center px-4 py-6"
    >
      <div
        className="w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex 
      items-center justify-center flex-col gap-8 bg-[rgba(255,255,255,0.1)]"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl text-white">Welcome Back!.</p>
          <p className="text-lg text-slate-200">Sign in to access Love House</p>
        </div>

        <div
          className="w-full lg:w-auto px-4 py-3 flex items-center justify-center
        border border-slate-200 cursor-pointer rounded-md active:scale-95 transition-all
        duration-150 ease-in-out bg-[rgba(255,255,255,0.2)]"
          onClick={handleLoginAction}
        >
          <FcGoogle className="text-3xl" />
          <p className="text-lg font-semibold text-white">
            Sign In With Google
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
