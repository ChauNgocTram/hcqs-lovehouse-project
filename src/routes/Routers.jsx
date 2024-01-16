import { Route, Routes } from "react-router-dom";
import { AdminDashboard, Auth, Home, Login } from "../pages";
import { AdminLayout, AuthLayout, HomeLayout } from "../layout";

function Routers() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Routers;
