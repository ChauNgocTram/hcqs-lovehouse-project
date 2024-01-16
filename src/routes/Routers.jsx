import { useRoutes } from "react-router-dom";
import {  Auth, Home, Login } from "../pages";
import {  AuthLayout, HomeLayout } from "../layout";

function Routers() {
  // return (
  //   <Routes>
  //     <Route path="/auth/*" element={<AuthLayout />}>
  //       <Route index element={<Auth />} />
  //       <Route path="login" element={<Login />} />
  //     </Route>

  //     <Route path="/admin" element={<AdminLayout />}>
  //       <Route index element={<AdminDashboard />} />
  //     </Route>

  //     <Route path="/" element={<HomeLayout />}>
  //       <Route index element={<Home />} />
  //     </Route>
  //   </Routes>
  // );

  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout/>,
      children: [
        { path: "/auth", element : <Auth/>},
        { path: "/auth/login", element: <Login/>}
      ]
    }
  ]);

  return routing;
}

export default Routers;
