import React, { useEffect } from "react";
import { signOutAction } from "../../../untils/helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user]);

  return (
    <div className="bg-orange text-white">
      <h1>hi</h1>
      <button onClick={signOutAction}>Logout</button>
    </div>
  );
}
