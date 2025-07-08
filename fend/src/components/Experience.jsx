import React from "react";
import { Chrono } from "react-chrono";
import { config } from "../utils/constants";
import Hero from "./Hero";

const Experience = () => (
  <>
    <div
      id="Publications"
      className="flex w-full justify-center items-center gradient-bg-welcome  "
    >
      <div className="flex  flex-col  items-center justify-between md:p-20 py-2 md:py-12 px-2  md:px-4">
        <Hero
          title={config.jobPage.title}
          description={config.jobPage.description}
        />

        <div className=" flex flex-col justify-start items-start w-full">
          <div className="  w-full">
            {/* <div style={{ width: "500px", height: "400px" }}> */}
            <Chrono
              items={config.jobPage.jobList}
              mode="VERTICAL_ALTERNATING"
              cardHeight="200"
              contentDetailsHeight="100"
              disableInteraction={true}
              disableClickOnCircle={true}
              disableNavOnKey={true}
              enableBreakPoint={true}
              enableQuickJump={false}
              disableToolbar={true}
              classNames={{
                card: "white-glassmorphism my-card",
                cardMedia: "my-card-media",
                cardSubTitle: "my-card-subtitle",
                cardText: "my-card-text",
                cardTitle: "my-card-title text-primary-color",
                controls: "my-controls",
                title: "my-title text-primary-color",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Experience;
