import { signOutAction } from "../../../untils/helpers";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignout = () => {
    signOutAction();
    navigate("/auth/login");
  };
  return (
    <div className="bg-orange text-white">
      <h1>hi</h1>
      <button onClick={handleSignout}>Logout</button>
    </div>
  );
}
