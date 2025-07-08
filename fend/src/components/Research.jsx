import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import Publications from "./Publications";
import Reviewing from "./Reviewing";
import { config } from "../utils/constants";
import Hero from "./Hero";

const Research = () => (
  <div className="min-h-screen  ">
    <div
      id="Publications"
      className="flex w-full justify-center items-center  "
    >
      <div className="flex  flex-col  items-center justify-between md:p-20 py-2 md:py-12 px-2  md:px-4">
        <Hero
          title={config.researchPage.title}
          description={config.researchPage.description}
        />

        {config?.researchPage?.publicationList && (
          <Publications publications={config.researchPage.publicationList} />
        )}
        {config.reviewing && config?.researchPage?.reviewing && (
          <Reviewing reviews={config.researchPage.reviewing} />
        )}
      </div>
    </div>
  </div>
);

export default Research;
