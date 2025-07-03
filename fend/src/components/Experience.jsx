import React from "react";
import { Chrono } from "react-chrono";
import { jobPage } from "../utils/constants";

const Experience = () => (
  <>
    <div
      id="Publications"
      className="flex w-full justify-center items-center gradient-bg-welcome  "
    >
      <div className="flex  flex-col  items-center justify-between md:p-20 py-12 px-4">
        <div className="flex flex-col justify-start items-center    py-12 w-3/4">
          <h1 className=" uppercase font-bold  text-3xl sm:text-5xl py-2 text-primary-color  ">
            {jobPage.title}
            <br />
          </h1>
          <p className="text-center my-2 text-white font-light md:w-9/12 w-11/12 text-base ">
            {jobPage.description}
          </p>
        </div>

        <div className=" flex flex-col justify-start items-start w-full">
          <div className="  w-full">
            {/* <div style={{ width: "500px", height: "400px" }}> */}
            <Chrono
              items={jobPage.jobList}
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
                card: "my-card",
                cardMedia: "my-card-media",
                cardSubTitle: "my-card-subtitle",
                cardText: "my-card-text",
                cardTitle: "my-card-title",
                controls: "my-controls",
                title: "my-title",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Experience;
