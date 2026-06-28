"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SkeletonBlogGrid } from "./Skeleton";

const POSTS_PER_PAGE = 9;

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
      <div className="flex w-full justify-center items-start mt-10 px-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="pb-8 border-b border-white/5">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Blog
            </h1>
            <p className="mt-3 text-lg text-gray-400 max-w-2xl">
              Thoughts, tutorials, and insights on development, blockchain, and
              research.
            </p>
          </div>

          {/* Category Navigation — simple text links à la Notion */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-6 border-b border-white/5">
            <button
              onClick={() => {
                setSelectedCategory("");
                setPage(1);
              }}
              className={`text-sm font-medium transition-colors duration-200 ${
                selectedCategory === ""
                  ? "text-white"
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
                className={`text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === cat._id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Posts */}
          {loading ? (
            <SkeletonBlogGrid count={POSTS_PER_PAGE} />
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">No posts published yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for new articles!
              </p>
            </div>
          ) : (
            <>
              {/* Notion-style Blog List — text-driven, minimal */}
              <div className="divide-y divide-white/5">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post._id}`}
                    className="group block py-8 first:pt-6 last:pb-0"
                  >
                    <article>
                      {/* Category label */}
                      {post.category && (
                        <span className="inline-block text-xs font-medium text-[#00FF99] mb-2">
                          {post.category.name ||
                            post.category.title ||
                            "Uncategorized"}
                        </span>
                      )}

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2 max-w-3xl">
                        {post.content
                          ? post.content
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 200) + "..."
                          : ""}
                      </p>

                      {/* Read more */}
                      <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-[#00FF99] transition-colors duration-200">
                        <span>Read post</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Notion-style Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 py-12 border-t border-white/5 mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
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
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
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
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
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
    </>
  );
};

export default Blog;
