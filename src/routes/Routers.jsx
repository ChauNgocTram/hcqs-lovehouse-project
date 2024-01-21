import React from "react";
import { useRoutes } from "react-router-dom";
import { Account, Auth, Home, Password, Profile, Setting } from "../pages";
import { AuthLayout, HomeLayout } from "../layout";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";

function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/news", element: <News /> },
        { path: "/newsDetail/:id", element: <NewsDetail /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Auth /> }],
    },
    {
      path: "/setting",
      element: <Setting />,
      children: [
        { path: "profile", element: <Profile /> },
        { path: "password", element: <Password /> },
        { path: "account", element: <Account /> },
      ],
    },
  ]);

  return routing;
}

export default Routers;
