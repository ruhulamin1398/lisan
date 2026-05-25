import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import Publications from "./Publications";
import Reviewing from "./Reviewing";
import { config } from "../utils/constants";
import Hero from "./Hero";

const Research = () => {
  const researchPage = config.researchPage;

  if (!researchPage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-white text-center text-lg md:text-xl">
          Research content is not available for the current configuration.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div
        id="Publications"
        className="flex w-full justify-center items-center"
      >
        <div className="flex flex-col items-center justify-between md:p-20 py-2 md:py-12 px-2 md:px-4">
          <Hero
            title={researchPage.title}
            description={researchPage.description}
          />

          {researchPage.publicationList && (
            <Publications publications={researchPage.publicationList} />
          )}
          {config.reviewing && researchPage.reviewing && (
            <Reviewing reviews={researchPage.reviewing} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Research;
