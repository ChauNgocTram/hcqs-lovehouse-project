import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'News Detail', path: '/newsDetail' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'House Projects', path: '/houseProject' },
    { label: 'About Us', path: '/aboutus' },
    // Add more pages as needed
  ];

  return (
    <nav className="bg-[#f6f6f6] mr-10 pl-40 w-full h-10 flex items-center">
      <ol className="list-reset flex ml-6">
        {/* Static Home element */}
        <li>
          <NavLink
            to="/"
            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
          >
            Home
          </NavLink>
          <span className="mx-2 text-neutral-500 dark:text-neutral-400 ">{'>'}</span>
        </li>

        {/* Dynamic breadcrumb based on current route */}
        {pathSegments.map((segment, index) => {
          const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const breadcrumbItem = breadcrumbItems.find((item) => item.path === currentPath);

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-400 ">{'>'}</span>
                </li>
              )}
              <li>
                {index === pathSegments.length - 1 ? (
                  <span className="text-baseOrange dark:text-baseOrange">{breadcrumbItem?.label || segment}</span>
                ) : (
                  <NavLink
                    to={currentPath}
                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    {breadcrumbItem?.label || segment}
                  </NavLink>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
