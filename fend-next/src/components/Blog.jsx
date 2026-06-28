"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SkeletonBlogGrid, SkeletonSidebar } from "./Skeleton";

const POSTS_PER_PAGE = 8;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/public/categories");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch {
        // Categories are non-critical
      } finally {
        setCategoriesLoading(false);
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

  // Full-page error state
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
      <div className="flex w-full justify-center items-start mt-16">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24">
          {/* Notion-style Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Blog
            </h1>
          </div>

          <div className="flex gap-12">
            {/* Left Sidebar — Category Navigation (Notion-style vertical list) */}
            <aside className="hidden md:block w-40 shrink-0">
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Thoughts, tutorials, and insights on development, blockchain, and
                research.
              </p>
              <nav className="sticky top-24 space-y-1">
                {categoriesLoading ? (
                  <SkeletonSidebar />
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setPage(1);
                      }}
                      className={`block w-full text-left text-sm py-1.5 transition-colors duration-150 ${
                        selectedCategory === ""
                          ? "text-white font-semibold"
                          : "text-gray-500 hover:text-gray-300"
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
                        className={`block w-full text-left text-sm py-1.5 transition-colors duration-150 ${
                          selectedCategory === cat._id
                            ? "text-white font-semibold"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </>
                )}
              </nav>
            </aside>

            {/* Mobile category selector */}
            <div className="md:hidden flex flex-wrap gap-2 mb-6 w-full">
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setPage(1);
                }}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  selectedCategory === ""
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-gray-300"
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
                  className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                    selectedCategory === cat._id
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Right — Main Content Grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <SkeletonBlogGrid count={POSTS_PER_PAGE} />
              ) : posts.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-gray-400 text-lg">
                    No posts published yet.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Check back soon for new articles!
                  </p>
                </div>
              ) : (
                <>
                  {/* 2-column Grid — Notion-style cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <Link
                        key={post._id}
                        href={`/blog/${post._id}`}
                        className="group block"
                      >
                        <article className="border border-white/10 rounded-lg overflow-hidden bg-transparent transition-colors duration-200 hover:border-white/20 h-full flex flex-col">
                          {/* Thumbnail Image */}
                          <div className="relative aspect-[16/9] overflow-hidden bg-slate-800/50">
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-10 h-10 text-gray-600"
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

                          {/* Card Content */}
                          <div className="p-5 flex flex-col flex-1">
                            {/* Category Tag */}
                            {post.category && (
                              <span className="text-xs font-medium text-[#00FF99] mb-2">
                                {post.category.name ||
                                  post.category.title ||
                                  "Uncategorized"}
                              </span>
                            )}

                            {/* Title */}
                            <h2 className="text-lg font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200 leading-snug">
                              {post.title}
                            </h2>

                            {/* Description */}
                            <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
                              {post.content
                                ? post.content
                                    .replace(/<[^>]*>/g, "")
                                    .substring(0, 160) + "..."
                                : ""}
                            </p>

                            {/* Read More */}
                            <div className="mt-4 text-sm text-gray-500 group-hover:text-[#00FF99] transition-colors duration-200">
                              Read post →
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>

                  {/* Notion-style Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1 py-12 mt-6 border-t border-white/5">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                          page === 1
                            ? "text-gray-600 cursor-not-allowed"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        ← Prev
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 text-sm rounded-md transition-colors ${
                              p === page
                                ? "text-white bg-white/10 font-medium"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
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
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                          page === totalPages
                            ? "text-gray-600 cursor-not-allowed"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
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
        </div>
      </div>
    </>
  );
};

export default Blog;
