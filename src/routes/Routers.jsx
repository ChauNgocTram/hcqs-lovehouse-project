import { useRoutes } from "react-router-dom";
import { Auth, Home, Login } from "../pages";
import { AuthLayout, HomeLayout } from "../layout";
import VerifyPopup from "../pages/Auth/VerifyPopup";

function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "/home", element: <Home /> }],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "/auth", element: <Auth /> },
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/verify", element: <VerifyPopup /> },
      ],
    },
  ]);

  return routing;
}

export default Routers;
