import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { CiEdit } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { RiChatDeleteLine } from "react-icons/ri";

import { About, Avatar, cloud } from "../../assets";
import { MutatingDots } from "../../components";
import { getAllAccount, getAllNews } from "../../api";
import { setAllNews } from "../../context/actions/allNewsAction";
import { setAllUsers } from "../../context/actions/allUsersAction";

const NewsList = () => {
  const allUsers = useSelector((state) => state?.allUsers?.allUsers);
  const allNews = useSelector((state) => state?.allNews?.allNews);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const loadData = async () => {
    try {
      const [newsData, usersData] = await Promise.all([
        getAllNews(1, 100),
        getAllAccount(1, 100),
      ]);

      dispatch(setAllNews(newsData.result.data));
      dispatch(setAllUsers(usersData.result.data));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [dispatch]);

  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }

  // Check if allUsers and allNews are defined
  if (!allUsers || !allNews) {
    return (
      <div className="absolute z-30 bg-white bg-opacity-20 w-full h-full flex items-center justify-center">
        <MutatingDots />
      </div>
    );
  }

  // Filter news based on searchInput
  const filteredNews = allNews.filter((news) =>
    news.header.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-50 ">
        <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl p-4">
          <div className="pt-4 pb-0">
            <div className="flex">
              <h2 className="flex-grow text-gray-900 text-2xl font-semibold">
                Your News
              </h2>
              <Link
                to={"/dashboard/create-news"}
                className="v-btn py-2 px-4
                bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200
                text-white transition ease-in duration-200 text-center text-base font-medium focus:outline-none focus:ring-2
                focus:ring-offset-2 rounded-lg flex items-center hover:no-underline"
              >
                <span className="no-underline mx-auto flex items-center">
                  <AiOutlinePlus className="mr-2 text-xl" />
                  Create a new News
                </span>
              </Link>
            </div>
            <small className="flex text-gray-500">Manage your News</small>
          </div>
        </div>
      </div>

      {/* chart news nếu có thời gian  */}
      {/* <div className="flex bg-white">
        <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
          a
        </div>
      </div> */}

      <div className="flex bg-white">
        <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
          <div className="mt-8 pb-0">
            <div className="mb-6 relative">
              <div className="text-gray-700 font-semibold text-sm pb-2">
                Search a News
              </div>
              <div className="flex items-center justify-center gap-3 w-full h-full px-4 rounded-md border-gray-300 border bg-white">
                <input
                  type="text"
                  placeholder="Name of feedback to search"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-sm"
                />
              </div>
              <div className="flex flex-col mt-4 mb-4">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => {
                    const user = allUsers.find(
                      (u) => u.user.id === news.accountId
                    ) || { firstName: "", lastName: "" };
                    // Log the user and news data to debug
                    console.log("Filtered News:", news);
                    console.log("User:", user);

                    return (
                      <div
                        key={news.id}
                        className="flex border w-full shadow-md rounded-sm my-2"
                      >
                        <div className="p-4 w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center justify-start">
                                <img
                                  src={Avatar}
                                  alt="avatar"
                                  className="w-8 rounded-full"
                                />
                                <div className="px-2">
                                  {user.user.firstName} {user.user.lastName}
                                </div>
                              </div>
                              <div className="flex py-4">
                                <motion.img
                                  whileHover={{ scale: 1.2 }}
                                  src={About}
                                  alt="news image"
                                  className="h-24 w-40"
                                />
                                <div className="px-2">
                                  <div>{news.header}</div>
                                  <div>
                                    {new Date(news.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="relative group flex items-center justify-center p-2 bg-orange-500 hover:bg-orange-600 rounded-3xl text-white
                      cursor-pointer"
                            >
                              <div>Operation</div>
                              <div className="pl-2">
                                <FaCaretDown />
                              </div>

                              <div className="absolute hidden group-hover:block right-0 top-10 bg-white text-baseDark rounded-md border">
                                <div className="flex flex-col ">
                                  <div
                                    className="flex items-center justify-start px-2 py-1 m-2 hover:bg-gray-300 
                            rounded-md"
                                  >
                                    <div className="text-2xl">
                                      <CiEdit />
                                    </div>
                                    <div className="flex flex-col text-nowrap px-4">
                                      <p className="font-semibold">Edit</p>
                                      <p className="text-sm">
                                        Change the News Page{" "}
                                      </p>
                                    </div>
                                  </div>

                                  <div
                                    className="flex items-center justify-start px-2 py-1 m-2 hover:bg-gray-300 
                            rounded-md"
                                  >
                                    <div className="text-2xl">
                                      <RiChatDeleteLine />
                                    </div>
                                    <div className="flex flex-col text-nowrap px-4">
                                      <p className="font-semibold text-red-500">
                                        Delete
                                      </p>
                                      <p className="text-sm">
                                        Delete the News and not restore
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  //   not News
                  <div className="flex bg-white">
                    <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
                      <div className="mt-8 pb-0">
                        <div className="flex flex-wrap justify-center max-w-4xl">
                          <img src={cloud} alt="cloud" className="w-56" />
                          <h3 className="w-full mt-4 text-center text-gray-900 font-semibold">
                            No News found
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
