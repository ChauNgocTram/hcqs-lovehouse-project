import React from 'react';
import { NavLink } from 'react-router-dom';

function Breadcrumb({ currentPage }) {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'House Projects', path: '/houseProject' },
    { label: 'About Us', path: '/aboutus' },
    // Add more pages as needed
  ];

  const getPageIndex = (path) => breadcrumbItems.findIndex((item) => item.path === path);

  // Filter only 'Home' and 'News' items
  const filteredBreadcrumbItems = breadcrumbItems.filter(
    (item) => item.label === 'Home' || item.label === 'News'
  );

  return (
    <nav className="bg-[#f6f6f6] mr-10 pl-40 w-full h-10 flex items-center ">
      <ol className="list-reset flex">
        {filteredBreadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li>
                <span className="mx-2 text-neutral-500 dark:text-neutral-400 ">{'>'}</span>
              </li>
            )}
            <li>
              {index === filteredBreadcrumbItems.length - 1 ? (
                <span className="text-baseOrange dark:text-baseOrange ">{currentPage}</span>
              ) : (
                <NavLink
                  to={item.path}
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
