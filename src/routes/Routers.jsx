import React from "react";
import { useRoutes } from "react-router-dom";
import { AdminLayout, AuthLayout, HomeLayout } from "../layout";
import { AdminDashboard, Home, Login } from "../pages";

export default function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [{ path: "login", element: <Login /> }],
    },
    {
      path: "admin",
      element: <AdminLayout />,
      children: [{ path: "dashboard", element: <AdminDashboard /> }],
    },
  ]);

  return routing;
}
