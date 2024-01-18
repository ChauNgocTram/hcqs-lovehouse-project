import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { RxPencil2 } from "react-icons/rx";
import { RxArrowTopRight } from "react-icons/rx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

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

function NewsSection() {
  const firstSixItems = imgList.slice(0, 6);

  return (
    <div className="flex items-center justify-center flex-col h-screen ">
      <h1 className="font-semibold uppercase text-4xl mb-12">
        LoveHouse's News
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
        {firstSixItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="absolute inset-0 bg-cover bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <RxPencil2 className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.name}</h1>
                <p className="lg:text-[18px]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Magni, perferendis?
                </p>
              </div>

              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavLink to={"/projects"}>
        <BtnViewMore />
      </NavLink>
    </div>
  );
}

export default NewsSection;
