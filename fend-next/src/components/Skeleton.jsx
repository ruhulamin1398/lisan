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

// Blog post card skeleton — matches the actual card layout
export const SkeletonCard = () => (
  <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 flex flex-col">
    {/* Image area */}
    <Shimmer className="h-48 shrink-0 rounded-none" />
    {/* Content */}
    <div className="flex flex-col gap-3 p-5 flex-1">
      {/* Category badge */}
      <Shimmer className="h-5 w-20 rounded-full" />
      {/* Title lines */}
      <Shimmer className="h-5 w-full" />
      <Shimmer className="h-5 w-3/4" />
      {/* Body text lines */}
      <div className="mt-1 space-y-2">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-4/6" />
      </div>
      {/* Read more */}
      <div className="mt-auto pt-2">
        <Shimmer className="h-4 w-24" />
      </div>
    </div>
  </div>
);

// Blog list skeleton (grid of cards)
export const SkeletonBlogGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// Single blog post detail skeleton
export const SkeletonBlogDetail = () => (
  <div className="w-full max-w-3xl mx-auto">
    {/* Back link */}
    <Shimmer className="h-4 w-28 mb-8" />
    {/* Category badge */}
    <Shimmer className="h-5 w-24 rounded-full mb-4" />
    {/* Title */}
    <Shimmer className="h-8 w-full mb-2" />
    <Shimmer className="h-8 w-5/6 mb-8" />
    {/* Featured image */}
    <Shimmer className="h-64 w-full rounded-2xl mb-8" />
    {/* Content paragraphs */}
    <div className="space-y-3">
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-11/12" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <div className="pt-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-3/4" />
      </div>
      <div className="pt-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-10/12" />
        <Shimmer className="h-4 w-full" />
      </div>
    </div>
    {/* Similar posts heading */}
    <div className="mt-16 pt-12 border-t border-white/10">
      <Shimmer className="h-6 w-40 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden"
          >
            <Shimmer className="h-36 rounded-none" />
            <div className="p-4 space-y-2">
              <Shimmer className="h-3 w-16 rounded-full" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-3/4" />
              <Shimmer className="h-3 w-full" />
              <Shimmer className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
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
