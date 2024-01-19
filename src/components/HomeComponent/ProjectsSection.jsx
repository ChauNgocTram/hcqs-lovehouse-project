import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { RxArrowRight } from "react-icons/rx";

import BtnViewMore from "../Button/BtnViewMore";

import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";


const imgList = [
  {
    img: banner1,
    name: "item1",
  },
  {
    img: banner2,
    name: "item2",
  },
  {
    img: banner3,
    name: "item3",
  },
  {
    img: banner1,
    name: "item4",
  },
  {
    img: banner2,
    name: "item5",
  },
  {
    img: banner3,
    name: "item6",
  },
  {
    img: banner1,
    name: "item7",
  },
  {
    img: banner2,
    name: "item8",
  },
  {
    img: banner3,
    name: "item9",
  },
];

function ProjectsSection() {
  const firstEightItems = imgList.slice(0, 8);

  const slideItems = [
    firstEightItems.slice(0, 4), 
    firstEightItems.slice(4, 8), 
  ];

  return (
    <div className="h-[600px] flex flex-col md:flex-row gap-5 items-center justify-center pt-28 mt-12 mb-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold uppercase">
          finished construction projects<span className="text-red-500">.</span>
        </h1>

        <p className=" text-[16px] max-w-[400px] text-neutral-500 leading-7 items-center text-justify pt-4 flex flex-col justify-center">
          Summary of LOVEHOUSE's completed construction projects. Our portfolio
          reflects a commitment to excellence, showcasing a harmonious blend of
          modern design and sustainable practices.
        </p>
        <NavLink to={"/sample-project"}>
          <BtnViewMore/>
        </NavLink>
      </div>
      <div className="w-[70%] md:w-[40%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 1,
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
        >
          {slideItems.map((items, slideIndex) => (
            <SwiperSlide key={slideIndex} className="mb-14">
              <div className="grid grid-cols-2 gap-4 px-10">
                {items.map((item, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={item.img}
                      alt="purple image"
                      className="rounded-md h-[240px] w-[240px] object-cover"
                    />
                    <div className="cursor-pointer absolute inset-0 bg-gradient-to-r max-w-[240px] rounded-md from-purple-800 via-pink-500 to-purple-800 opacity-0 group-hover:opacity-70" />
                    <div className="absolute text-white inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                      View Project
                      <RxArrowRight className="ml-2 w-[24px] h-[24px]" />
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProjectsSection;
