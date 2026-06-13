"use client";

import React, { useState, useEffect } from "react";
import { config } from "../utils/constants";
import Hero from "./Hero";
import Link from "next/link";
import { SkeletonBlogGrid } from "./Skeleton";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/public/categories");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch {
        // Categories are non-critical
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `/api/public/posts?limit=${POSTS_PER_PAGE}&page=${page}`;
        if (selectedCategory) url += `&category=${selectedCategory}`;

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok && data.posts) {
          setPosts(data.posts);
          setTotalPages(Math.ceil(data.total / POSTS_PER_PAGE) || 1);
        } else {
          setError(data.error || "Failed to fetch posts");
        }
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchPosts();
  }, [page, selectedCategory]);

  // Full-page error state (only when there's no posts to show)
  if (!initialLoad && error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-center items-center mt-10 px-4">
        <div className="w-full max-w-6xl">
          <Hero
            title="Blog"
            description="Thoughts, tutorials, and insights on development, blockchain, and research."
          />

          {/* Category Filter Buttons — always visible */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2.5 justify-center mt-8">
              {/* All button */}
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === ""
                    ? "bg-[#00FF99] text-slate-950 font-bold"
                    : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/10"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat._id
                      ? "bg-[#00FF99] text-slate-950 font-bold"
                      : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Posts area — skeleton while loading, content when ready */}
          {loading ? (
            <SkeletonBlogGrid count={POSTS_PER_PAGE} />
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts published yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for new articles!
              </p>
            </div>
          ) : (
            <>
              {/* Post Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                {posts.map((post) => (
                  <Link key={post._id} href={`/blog/${post._id}`}>
                    <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col">
                      {/* Post Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-900 shrink-0">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-14 w-14"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="flex flex-col justify-between p-5 flex-1">
                        <div>
                          {post.category && (
                            <span className="inline-block text-xs font-semibold text-[#00FF99] bg-[#00FF99]/10 px-3 py-1 rounded-full w-fit mb-3">
                              {post.category.name ||
                                post.category.title ||
                                "Uncategorized"}
                            </span>
                          )}
                          <h2 className="text-lg font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200 leading-snug">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                            {post.content
                              ? post.content
                                  .replace(/<[^>]*>/g, "")
                                  .substring(0, 160) + "..."
                              : ""}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                          <span className="text-[#00FF99] group-hover:underline">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pb-16">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      page === 1
                        ? "bg-slate-800/50 text-gray-600 cursor-not-allowed"
                        : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white border border-white/10"
                    }`}
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                          p === page
                            ? "bg-[#00FF99] text-slate-950 font-bold"
                            : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/10"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      page === totalPages
                        ? "bg-slate-800/50 text-gray-600 cursor-not-allowed"
                        : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white border border-white/10"
                    }`}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
