import React from "react";
import { useRoutes } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout.";
import Home from "../pages/Home/Home.jsx";
import News from "../pages/News/News"
import NewsDetail from "../pages/News/NewsDetail"
import HouseProject from "../pages/HouseProjects/HouseProject"
import Blog from "../pages/Blogs/Blog";
import BlogDetail from "../pages/Blogs/BlogDetail";

export default function Routers() {
    const routing = useRoutes([
        {
            path: "/",
            element: <HomeLayout/>,
            children: [
                { path: "/", element: <Home/>},
                { path: "/news", element: <News/>},
                { path: "/newsDetail/:id", element: <NewsDetail /> },
                { path: "/blog", element: <Blog/>},
                { path: "/blogDetail/:id", element: <BlogDetail/> },
              
                // { path: "/houseProject", element: <HouseProject /> },
                // { path: "/houseProjectDetail", element: <HouseProjectDetail /> },
                
            ],
        },
        // {
        //     element: <CommonLayout />,
        //     children: [
        //       { path: "/profile", element:  },
        //       { path: "/updateProfile", element:  },
        //       { path: "/changePassword", element: },
        //     ],
        //   },
        //   {
        //     path: "/admin",
        //     element: <AdminLayout />,
        //     children: [
        //       { path: "/admin", element:  },
              
        //     ],
        //   },
    ]);
    return routing;
}
