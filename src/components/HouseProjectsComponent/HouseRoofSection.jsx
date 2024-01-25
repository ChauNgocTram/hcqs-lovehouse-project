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
            <img
                    className="lg:h-72 md:h-48 w-full object-cover object-center"
                    //src={project.staticFile[1].url}
                    alt="blog"
                  />
              <div className="p-6 h-[315px] hover:bg-baseOrange hover:text-white transition duration-300 ease-in">
                    
                    <h1 className="text-2xl font-semibold mb-3">
                      <NavLink to={`/blogDetail/${project.id}`}>
                        {project.sampleProject.header}
                      </NavLink>
                    </h1>
                    </div>
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
