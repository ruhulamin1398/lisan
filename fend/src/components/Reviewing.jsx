import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { IoIosHeart } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiIeee } from "react-icons/si";
import { FaResearchgate } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

import { config } from "../utils/constants";

const Paper = ({ title, key }) => (
  <>
    <h3 className="my-2 text-white text-xl  py-2  border-b border-gray-500 ">
      {" "}
      {title}.{" "}
    </h3>
  </>
);

const Reviewing = () => (
  <>
    <div
      id="Reviewing"
      className="flex w-full justify-center items-center h-full   mb-[20px] md:mb-[100px]"
    >
      <div className="flex  flex-col  items-center justify-between md:p-5 py-2 px-2">
        <div className="flex flex-col justify-start items-center    py-2 w-full">
          <h1 className=" uppercase font-bold   text-3xl sm:text-5xl py-2  text-primary-color    ">
            Research Paper Review
            <br />
            {/* continue to improve */}
          </h1>
          <p className="text-center my-2 text-white font-light md:w-9/12 w-11/12 text-base ">
            In the past year, I've had the pleasure of reviewing 41 papers at 13
            different conferences.
          </p>
        </div>

        <div className=" flex flex-col justify-start items-start w-full ">
          <div className="flex flex-row justify-start items-start  w-full">
            <div className="ml-1 md:ml-5 flex flex-col flex-1 p-2 md:p-[15px]">
              {config.reviewing.reverse().map((review, index) => (
                <Paper
                  key={index} // Ensure each element has a unique key
                  title={review.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Reviewing;
