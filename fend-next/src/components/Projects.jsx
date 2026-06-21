"use client";

import React, { useState, useEffect } from "react";
import Hero from "./Hero";

const getImageSrc = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image?.src || image?.default || "";
};

const Projects = () => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [categoryOrder, setCategoryOrder] = useState(["All"]);

  useEffect(() => {
    const site = process.env.NEXT_PUBLIC_ENV || "ruhul-dev";
    fetch(`/api/public/projects?site=${site}`)
      .then((res) => res.json())
      .then((data) => {
        setProjectData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });

    // Fetch project categories for proper ordering
    fetch(`/api/public/project-categories?site=${site}`)
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          const names = cats.map((c) => c.name);
          setCategoryOrder(["All", ...names]);
        }
      })
      .catch(() => {
        // Fallback to default order
        setCategoryOrder(["All", "Blockchain", "Web Apps", "Software"]);
      });
  }, []);

  if (loading) {
    const skeletonCards = [1, 2, 3];
    return (
      <div
        id="FeatureProject"
        className="flex w-full justify-center items-center mt-10 px-4"
      >
        <div className="w-full max-w-7xl">
          {/* Skeleton Hero */}
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-slate-700/50 rounded-full mb-3" />
            <div className="h-4 w-96 max-w-full bg-slate-700/50 rounded-full" />
          </div>

          {/* Skeleton Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 mb-2 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-24 rounded-full bg-slate-700/50"
              />
            ))}
          </div>

          {/* Skeleton Project Cards */}
          <div className="space-y-8 py-10">
            {skeletonCards.map((i) => (
              <div
                key={i}
                className="animate-pulse grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl lg:grid-cols-[360px_minmax(0,1fr)]"
              >
                {/* Image placeholder */}
                <div className="relative h-72 overflow-hidden bg-slate-800/80 lg:h-auto" />

                {/* Content placeholder */}
                <div className="flex flex-col justify-between p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="h-7 w-3/4 bg-slate-700/50 rounded-full" />
                    <div className="space-y-2 mt-4">
                      <div className="h-3 w-full bg-slate-700/50 rounded-full" />
                      <div className="h-3 w-11/12 bg-slate-700/50 rounded-full" />
                      <div className="h-3 w-4/5 bg-slate-700/50 rounded-full" />
                      <div className="h-3 w-3/5 bg-slate-700/50 rounded-full" />
                    </div>
                  </div>

                  {/* Button skeleton */}
                  <div className="flex gap-3">
                    <div className="h-10 w-28 rounded-full bg-slate-700/50" />
                    <div className="h-10 w-28 rounded-full bg-slate-700/50" />
                  </div>

                  {/* Tools skeleton */}
                  <div className="h-3 w-48 bg-slate-700/50 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const projectPage = projectData;
  const projects = Array.isArray(projectPage?.projects)
    ? projectPage.projects
    : [];

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  // Categories sorted by API order (fetched from ProjectCategories model)
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
            {visibleProjects.map((project, index) => (
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
                        #{index + 1}
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
