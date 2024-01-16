import { LoginBG } from "../../assets";

function Auth() {
  return (
    <div
      style={{
        background: `url(${LoginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen flex items-center justify-center"
    >
      Auth
    </div>
  );
}

export default Auth;
