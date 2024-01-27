import React from "react";
import {  useRoutes } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout.";
import  AuthLayout  from "../layout/AuthLayout"
import Home from "../pages/Home/Home.jsx";
import {
  AboutUs,
  Account,
  Auth,
  Dashboard,
  Password,
  Profile,
  Setting,
  UsersList,
} from "../pages";

import HouseProject from "../pages/HouseProjects/HouseProject";
import HouseRoof from "../pages/HouseProjects/HouseRoof/HouseRoof";
import HouseRoofDetail from "../pages/HouseProjects/HouseRoof/HouseRoofDetail";
import TownHouse from "../pages/HouseProjects/TownHouse/TownHouse";
import TownHouseDetail from "../pages/HouseProjects/TownHouse/TownHouseDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Blog from "../pages/Blogs/Blog";
import BlogDetail from "../pages/Blogs/BlogDetail";
import { PageNotfound } from "../components";

export default function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },        
        { path: "/houseProject", element: <HouseProject /> },
        { path: "/house-roof-projects", element: <HouseRoof /> },        {
          path: "/house-roof-projects/details/:id",
          element: <HouseRoofDetail />,
        },
        { path: "/town-house-projects", element: <TownHouse /> },
        {
          path: "/town-house-projects/details/:id",
          element: <TownHouseDetail />,
        },
        { path: "/news", element: <News /> },
        { path: "/news/newsDetail/:id", element: <NewsDetail /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/blogDetail/:id", element: <BlogDetail /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout/>,
      children: [{ path: "/auth", element: <Auth /> }],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [{ path: "users-list", element: <UsersList /> }],
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
    {
      path: "/404",
      element: <PageNotfound />,
    },
  ]);
  return routing;
}
