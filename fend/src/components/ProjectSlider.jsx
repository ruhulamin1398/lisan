// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// // import 'swiper/scss/pagination';
// // import { Navigation } from 'swiper';

import React, { useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiExternalLinkFill, RiHeart2Fill } from "react-icons/ri";
import Logos from "./Logos";

import demo from "../../images/demo.png";
import Lottaverse from "../../images/project/lottaverse.png";
import SecureDoc from "../../images/project/securedoc.png";
import Billy from "../../images/project/billy.png";
import Drive from "../../images/project/drive.png";

import { Controller } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { projectPage } from "../utils/constants";

// Import Swiper styles

const ProjectSlider = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        rewind={true}
        modules={[Navigation, Pagination]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
      >
        {projectPage.projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div
              id="services"
              className="flex w-full justify-center items-center  "
            >
              <div className="flex  flex-col-reverse md:flex-row   items-center justify-between md:p-20 py-4 px-4 ">
                <div className="   flex-1  justify-start items-start  text-left  ">
                  <div className="text-8xl leading-none font-extrabold   text-transparent text-outline mt-10 mb-2  outlineText  ">
                    0{project.id}
                  </div>
                  <h1 className="   font-bold text-xl sm:text-xl py-2 text-primary-color  titleCase   ">
                    {project.title}
                  </h1>
                  <p className="text-left my-2 text-white font-light w-full text-base pr-2 md:pr-6 text-justify">
                    {project.description}
                  </p>

                  <div className="text-primary-color  font-bold text-left py-2">
                    {project.tools}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-color "
                  >
                    <div className="flex gap-2">
                      Live Link <RiExternalLinkFill className="h-[25px]" />
                    </div>
                  </a>
                </div>

                <div className=" flex-1  justify-end items-center   ">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full   object-cover rounded-md shadow-3xl   "
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ProjectSlider;
