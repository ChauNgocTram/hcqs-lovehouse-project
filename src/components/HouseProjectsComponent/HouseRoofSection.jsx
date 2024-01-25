import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

//import BtnViewMore from "../Button/BtnViewMore";
import { getAllProjects } from "../../constants/apiHouseProject";

export default function HouseRoofSection() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getAllProjects();
      if (data && data.result) {
        setProjectData(data.result.data);
      }
    };
    fetchProject();
  }, []);

  const filteredProjects = projectData.filter(project => project.sampleProject.projectType === 1);

  const firstSixItems = projectData.slice(0, 6);
  return (
    <div className="flex items-center justify-center flex-col h-screen ">
      <h1 className="font-semibold uppercase text-4xl mb-12">
        House Roof
      </h1>

      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {firstSixItems.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg  rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-cover bg-black opacity-10 group-hover:opacity-50 " />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-2xl font-semibold hover:text-white">
                  <NavLink to={`/newsDetail/${project.id}`}>
                    {" "}
                    {project.sampleProject.header}
                  </NavLink>
                </h1>
              </div>
              <NavLink to={`/newsDetail/${project.id}`}>
                <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavLink to={"/news"}>
        {/* <BtnViewMore /> */}
      </NavLink>
    </div>
  );
}
