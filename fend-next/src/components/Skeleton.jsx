"use client";

import React from "react";

// Base block with shimmer animation
const Shimmer = ({ className = "" }) => (
  <div
    className={`relative overflow-hidden bg-slate-800/60 rounded-xl ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
  </div>
);

// Notion-style blog list skeleton (2-column grid with images)
export const SkeletonBlogGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
        {/* Image area */}
        <div className="aspect-[16/9] bg-slate-800/50">
          <Shimmer className="h-full w-full rounded-none" />
        </div>
        {/* Content */}
        <div className="p-5 space-y-2">
          {/* Category */}
          <Shimmer className="h-3 w-16" />
          {/* Title */}
          <Shimmer className="h-5 w-full" />
          <Shimmer className="h-5 w-3/4" />
          {/* Body */}
          <Shimmer className="h-3.5 w-full" />
          <Shimmer className="h-3.5 w-5/6" />
          {/* Read more */}
          <Shimmer className="h-3.5 w-20 mt-3" />
        </div>
      </div>
    ))}
  </div>
);

// Sidebar skeleton — shimmer placeholders for left sidebar category links
export const SkeletonSidebar = () => (
  <nav className="sticky top-24 space-y-1">
    <div className="space-y-1.5">
      <Shimmer className="h-3 w-12" />
      <Shimmer className="h-3 w-24" />
      <Shimmer className="h-3 w-20" />
      <Shimmer className="h-3 w-28" />
    </div>
  </nav>
);

// Single blog post detail skeleton (Ramp-style with TOC)
export const SkeletonBlogDetail = () => (
  <>
    {/* Back link */}
    <Shimmer className="h-4 w-28 mb-10" />
    <div className="flex gap-12 relative">
      {/* TOC skeleton (hidden on mobile) */}
      <div className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <Shimmer className="h-3 w-20 mb-4" />
          <div className="space-y-2">
            <Shimmer className="h-3 w-40" />
            <Shimmer className="h-3 w-36" />
            <Shimmer className="h-3 w-44" />
            <Shimmer className="h-3 w-32" />
          </div>
        </div>
      </div>
      {/* Content skeleton — fills remaining space */}
      <div className="flex-1 min-w-0">
        {/* Category */}
        <Shimmer className="h-3 w-24 mb-3" />
        {/* Title */}
        <Shimmer className="h-10 w-full mb-2" />
        <Shimmer className="h-10 w-4/5 mb-8" />
        {/* Featured image */}
        <Shimmer className="h-64 w-full rounded-2xl border border-white/10 mb-10" />
        {/* Content paragraphs */}
        <div className="space-y-3">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-11/12" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
          <div className="pt-4">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
          </div>
          <div className="pt-4">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-10/12" />
            <Shimmer className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
    {/* Similar posts */}
    <div className="mt-16 pt-12 border-t border-white/5">
      <Shimmer className="h-5 w-32 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/5 p-5 space-y-2"
          >
            <Shimmer className="h-2.5 w-16" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  </>
);

// Project card skeleton — matches the actual project card layout (horizontal)
export const SkeletonProjectCard = () => (
  <div className="grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl lg:grid-cols-[360px_minmax(0,1fr)]">
    {/* Image placeholder */}
    <Shimmer className="h-72 rounded-none lg:h-auto" />
    {/* Content placeholder */}
    <div className="flex flex-col justify-between p-6 space-y-4">
      <div className="space-y-3">
        <Shimmer className="h-7 w-3/4" />
        <div className="space-y-2 mt-4">
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-11/12" />
          <Shimmer className="h-3 w-4/5" />
          <Shimmer className="h-3 w-3/5" />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-3">
        <Shimmer className="h-10 w-28 rounded-full" />
        <Shimmer className="h-10 w-28 rounded-full" />
      </div>
      {/* Tools */}
      <Shimmer className="h-3 w-48" />
    </div>
  </div>
);

// Project page skeleton — matches the actual project page layout
export const SkeletonProjectPage = () => (
  <div className="w-full max-w-7xl mx-auto mt-10">
    {/* Hero skeleton */}
    <Shimmer className="h-8 w-48 rounded-full mb-3" />
    <Shimmer className="h-4 w-96 max-w-full" />

    {/* Filter tabs skeleton */}
    <div className="flex flex-wrap justify-center gap-2 mt-10 mb-2">
      {[1, 2, 3, 4].map((i) => (
        <Shimmer key={i} className="h-9 w-24 rounded-full" />
      ))}
    </div>

    {/* Cards skeleton */}
    <div className="space-y-8 py-10">
      {[1, 2, 3].map((i) => (
        <SkeletonProjectCard key={i} />
      ))}
    </div>
  </div>
);

// Generic page skeleton (for other pages)
export const SkeletonPage = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-10">
    <Shimmer className="h-10 w-64 mb-6" />
    <Shimmer className="h-5 w-96 mb-10" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 space-y-3"
        >
          <Shimmer className="h-32 w-full rounded-xl" />
          <Shimmer className="h-5 w-3/4" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);
