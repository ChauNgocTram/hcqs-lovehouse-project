import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <p>Header</p>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
}

export default AuthLayout;
