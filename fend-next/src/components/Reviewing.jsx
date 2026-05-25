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
import Hero from "./Hero";

const Paper = ({ title, key }) => (
  <>
    <h3 className="my-2 text-white text-xl  py-2  border-b border-gray-500 ">
      {title}
    </h3>
  </>
);

const Reviewing = ({ reviews }) => {
  const reviewList = Array.isArray(reviews) ? [...reviews].reverse() : [];

  if (reviewList.length === 0) {
    return null;
  }

  return (
    <>
      <Hero
        title={"Research Paper Review"}
        description={
          "In the past year, I've had the pleasure of reviewing 41 papers at 13 different conferences."
        }
      />
      <div id="Reviewing" className="">
        <div className="flex flex-col">
          {reviewList.map((review, index) => (
            <Paper
              key={index} // Ensure each element has a unique key
              title={review.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviewing;
