import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import Logos from "./Logos";
import { config } from "../utils/constants";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center my-auto bg-[${color}]`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-primary-color text-lg ">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-full">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <>
      {config.servicesPage.map((service) => (
        <div
          key={service.title}
          id="services"
          className="flex w-full justify-center items-center "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between md:p-20 py-12 px-4">
            <div className="grid justify-start items-start">
              <h1 className=" uppercase font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
                {service.title}
                <br />
              </h1>
              <p className="text-left my-2 text-white font-light w-full md:w-9/12  text-base">
                {service.des}
              </p>
            </div>

            <div className="   grid grid-cols-1 md:grid-cols-2 col-span-2 justify-start items-start">
              {service.list.map((item, index) => (
                <ServiceCard
                  key={index} // Adding the `key` prop
                  color={item.color}
                  title={item.title}
                  icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                  subtitle={item.subtitle}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* <div id="services" className="flex w-full justify-center items-center  ">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between md:p-20 py-12 px-4">
          <div className="grid justify-start items-start">
            <h1 className=" uppercase font-bold text-3xl sm:text-5xl py-2 text-primary-color  mt-10  ">
              {servicesListWeb.title}
              <br />
            </h1>
            <p className="text-left my-2 text-white font-light w-full md:w-9/12  text-base">
              {servicesListWeb.des}
            </p>
          </div>

          <div className="   grid grid-cols-1 md:grid-cols-2 col-span-2 justify-start items-start">
            {servicesListWeb.list.map((service, index) => (
              <ServiceCard
                key={index} // Adding the `key` prop
                color={service.color}
                title={service.title}
                icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                subtitle={service.subtitle}
              />
            ))}
          </div>
        </div>
      </div> */}

      <Logos />
    </>
  );
};

export default Services;
