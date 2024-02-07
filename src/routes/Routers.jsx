import React from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import AuthLayout from "../layout/AuthLayout";
import CustomerLayout from "../layout/CustomerLayout";
import StaffLayout from "../layout/StaffLayout";
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
import HouseRoofList from "../pages/HouseProjects/HouseRoof/HouseRoofList";
import HouseRoofDetail from "../pages/HouseProjects/HouseRoof/HouseRoofDetail";
import TownHouseList from "../pages/HouseProjects/TownHouse/TownHouseList";
import TownHouseDetail from "../pages/HouseProjects/TownHouse/TownHouseDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import Blog from "../pages/Blogs/Blog";
import BlogDetail from "../pages/Blogs/BlogDetail";
import { PageNotfound } from "../components";
import QuoteRequestForm from "../pages/Quotation/QuotationForm/QuoteRequestForm";
import Customer from "../pages/Customer/Customer";
import QuoteRequest from "../pages/Customer/QuoteRequest";
import AllRequest from "../pages/Staff/QuoteManagement/AllRequest";
import ConfigProject from "../pages/Staff/QuoteManagement/ConfigProject";
import ConfigProject2 from "../pages/Staff/QuoteManagement/ConfigProject2";

export default function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/houseProject", element: <HouseProject /> },
        { path: "/house-roof-projects", element: <HouseRoofList /> },
        {
          path: "/house-roof-projects/details/:id",
          element: <HouseRoofDetail />,
        },
        { path: "/town-house-projects", element: <TownHouseList /> },
        {
          path: "/town-house-projects/details/:id",
          element: <TownHouseDetail />,
        },
        { path: "/news", element: <News /> },
        { path: "/news/newsDetail/:id", element: <NewsDetail /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/blogDetail/:id", element: <BlogDetail /> },
        { path: "/quote-request", element: <QuoteRequestForm /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Auth /> }],
    },
    {
      path: "/customer",
      element: <CustomerLayout />,
      children: [
        { path: "/customer/dashboard", element: <Customer /> },
        { path: "/customer/my-request", element: <QuoteRequest /> },
      ],
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        { path: "/staff/all-request", element: <AllRequest /> },
        // { path: "/staff/config-project/:id", element: <ConfigProject /> },
        { path: "/staff/config-project/:id", element: <ConfigProject2/> },
      ],
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
