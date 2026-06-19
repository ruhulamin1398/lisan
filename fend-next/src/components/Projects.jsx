"use client";

import React, { useState } from "react";
import { config } from "../utils/constants";
import Hero from "./Hero";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image?.src || image?.default || "";
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const projectPage = config?.projectPage;
  const projects = Array.isArray(projectPage?.projects)
    ? projectPage.projects
    : [];

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  // Custom order: All, Blockchain, Web Apps, Software
  const categoryOrder = ["All", "Blockchain", "Web Apps", "Software"];
  const sortedCategories = categoryOrder.filter(c => categories.includes(c));

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  if (!projectPage || projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Projects</h1>
          <p className="text-base">
            Project details are not available for this configuration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="FeatureProject"
        className="flex w-full justify-center items-center mt-10 px-4"
      >
        <div className="w-full max-w-7xl">
          <Hero
            title={projectPage.title}
            description={projectPage.description}
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 mb-2">
            {sortedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(3); }}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary-color text-gray-900 shadow-lg shadow-primary-color/40 scale-105"
                    : "text-slate-500 border border-white/10 hover:border-primary-color/50 hover:text-white bg-slate-900/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-8 py-10">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-[360px_minmax(0,1fr)]"
              >
                <div className="relative h-72 overflow-hidden bg-slate-900 lg:h-auto">
                  <img
                    src={getImageSrc(project.image)}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-6">
                  <div>
                    <h2 className="mt-1 text-3xl font-semibold text-white">
                      <span className="text-primary-color">
                        {" "}
                        #{project.id}
                        {". "}
                      </span>
                      {project.title}
                    </h2>
                    <p
                      className="mt-4 text-sm leading-7 text-slate-300"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row text-right">
                    <a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-primary-color   px-5 py-2 text-sm font-semibold text-primary-color transition  hover:text-slate-100"
                    >
                      Live Link
                    </a>
                    {project.links && project.links.length > 0 && (
                      <>
                        {project.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-primary-color  px-5 py-2 text-sm font-semibold text-primary-color transition     hover:text-slate-100 "
                          >
                            {link.title}
                          </a>
                        ))}
                      </>
                    )}
                  </div>

                  {project.tools ? (
                    <p className="mt-6 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {project.tools}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
            {hasMore && (
              <div className="flex justify-center pt-4 pb-2">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 2)}
                  className="group relative inline-flex items-center gap-2 rounded-full border border-primary-color/50 bg-slate-900/80 px-8 py-3 text-sm font-semibold text-primary-color transition-all duration-300 hover:border-primary-color hover:bg-primary-color hover:text-gray-900 hover:shadow-lg hover:shadow-primary-color/30"
                >
                  <span>Show More</span>
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-primary-color/20 px-1.5 text-xs text-primary-color transition-colors group-hover:bg-gray-900/30 group-hover:text-gray-900">
                    +{remainingCount}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
