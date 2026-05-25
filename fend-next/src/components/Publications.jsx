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

const Paper = ({ title, description, authors, link, isAward, color }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2  hover:shadow-xl w-full">
    <div
      className={`w-5 h-5 my-auto rounded-full flex justify-center items-center ${color}`}
    >
      <BsShieldFillCheck fontSize={21} className="text-white" />
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="my-2 text-primary-hover cursor-pointer text-xl    ">
        <a href={link["IEEE"]} target="_blank">
          {title}
        </a>
      </h3>
      {isAward ? (
        <p className=" italic  text-right text-primary-color text-base  font-bold mt-0  md:mt-[-25px] ">
          [ Best Presentation Award ]
        </p>
      ) : null}
      <div
        className="text-gray-500 text-sm italic "
        dangerouslySetInnerHTML={{ __html: authors }}
      />
      <p className="mt-1 text-white text-sm w-full md:w-11/12">{description}</p>

      {!link.hideLinsks && (
        <div className="flex flex-auto flex-row-reverse gap-4">
          <a href={link["IEEE"]} target="_blank">
            <FaResearchgate fontSize={21} className="text-white" />
          </a>

          <a href={link["IEEE"]} target="_blank">
            <SiIeee fontSize={41} className="text-white mt-[-10px]" />
          </a>
          <a href={config.researchLinks.googleScholar.link} target="_blank">
            <SiGooglescholar fontSize={21} className="text-white" />
          </a>
        </div>
      )}
    </div>
  </div>
);

const Publications = ({ publications }) => {
  const papers = Array.isArray(publications) ? publications : [];

  if (papers.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start">
        {papers.map((publication, index) => (
          <Paper
            key={index} // Ensure each element has a unique key
            color="bg-[#8945F8]"
            title={publication.title}
            description={publication.description}
            authors={publication.authors}
            link={publication.link}
            isAward={publication.isAward}
          />
        ))}
      </div>
    </>
  );
};

export default Publications;
