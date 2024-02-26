import React from "react";
import { useRoutes } from "react-router-dom";
import { HomeLayout, CustomerLayout, StaffLayout } from "../layout";
import AuthLayout from "../layout/AuthLayout";

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
  HouseProject,
  HouseRoofList,
  HouseRoofDetail,
  TownHouseList,
  TownHouseDetail,
  News,
  NewsDetail,
  Blog,
  BlogDetail,
  QuoteRequestForm,
  QuotationForm,
  Quotation,
  Customer,
  QuoteRequest,
  ProjectDetailsForCustomer,
  QuoteDetailsForCustomer,
  AllRequest,
  ConfigProject2,
  ProjectDetailsForStaff,
  ManageMaterialDetails,
} from "../pages";

import { PageNotfound } from "../components";
import ListPaymentProgress from "../pages/Staff/QuoteManagement/ContractDetails/ListPaymentProgress";
import CreateProgressForm from "../pages/Staff/QuoteManagement/ContractDetails/ManageContract/CreateProgressForm";
import CreateProgress from "../pages/Staff/QuoteManagement/ContractDetails/ManageContract/CreateProgress";
import QuoteDetailsForStaff from "../pages/Staff/QuoteManagement/QuotationDetails/QuoteDetailsForStaff";
import PaymentProgress from "../pages/Customer/Contract/PaymentProgress";

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
        // { path: "/quote-request", element: <QuoteRequestForm /> },
        { path: "/quote-request", element: <Quotation /> },
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
        {
          path: "/customer/project-detail/:id",
          element: <ProjectDetailsForCustomer />,
        },
        {
          path: "/customer/quotation-detail/:id",
          element: <QuoteDetailsForCustomer />,
        },
        {
          path: "/customer/payment-progress/:id",
          element: <PaymentProgress/>,
        },
      ],
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        { path: "/staff/all-request", element: <AllRequest /> },
        {
          path: "/staff/project-detail/:id",
          element: <ProjectDetailsForStaff />,
        },
        { path: "/staff/config-project/:id", element: <ConfigProject2 /> },
        
        { path: "/staff/quotation-detail/:id", element: <QuoteDetailsForStaff/> },
        { path: "/staff/manage-material-detail/:id", element: <ManageMaterialDetails/> },
        { path: "/staff/contract-payment-progress/:id", element: <ListPaymentProgress/> },
        { path: "/staff/create-list-progress/:id", element: <CreateProgress/> },
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
