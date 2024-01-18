import { useRoutes } from "react-router-dom";
import { Auth, Home, Login } from "../pages";
import { AuthLayout, HomeLayout } from "../layout";

function Routers() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "/auth", element: <Auth /> }],
    },
  ]);

  return routing;
}

export default Routers;
