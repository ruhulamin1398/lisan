"use client";

import React from "react";
import { Chrono } from "react-chrono";
import { config } from "../utils/constants";
import Hero from "./Hero";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image?.src || image?.default || "";
};

const Experience = () => {
  const jobPage = config?.jobPage;
  const jobs = Array.isArray(jobPage?.jobList) ? jobPage.jobList : [];
  const formattedJobs = jobs.map((job) => {
    if (job?.media?.source?.url) {
      return {
        ...job,
        media: {
          ...job.media,
          source: {
            ...job.media.source,
            url: getImageSrc(job.media.source.url),
          },
        },
      };
    }
    return job;
  });

  if (!jobPage || formattedJobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Experience</h1>
          <p className="text-base">
            Experience information is not available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="Publications"
        className="flex w-full justify-center items-center gradient-bg-welcome"
      >
        <div className="flex flex-col items-center justify-between md:p-20 py-2 md:py-12 px-2 md:px-4">
          <Hero title={jobPage.title} description={jobPage.description} />

          <div className="flex flex-col justify-start items-start w-full">
            <div className="w-full">
              <Chrono
                items={formattedJobs}
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
};

export default Experience;
