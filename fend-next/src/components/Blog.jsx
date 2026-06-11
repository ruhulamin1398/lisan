"use client";

import React, { useState, useEffect } from "react";
import { config } from "../utils/constants";
import Hero from "./Hero";
import Link from "next/link";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/public/posts?limit=50");
        const data = await res.json();

        if (res.ok && data.posts) {
          setPosts(data.posts);
        } else {
          setError(data.error || "Failed to fetch posts");
        }
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-[#00FF99] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-base">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
        <div className="w-full max-w-5xl">
          <Hero
            title="Blog"
            description="Thoughts, tutorials, and insights on development, blockchain, and research."
          />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts published yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for new articles!
              </p>
            </div>
          ) : (
            <div className="space-y-6 py-10">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post._id}`}>
                  <div className="group grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-[280px_minmax(0,1fr)] cursor-pointer">
                    {/* Post Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-900 lg:h-auto">
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
                            className="h-16 w-16"
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
                    <div className="flex flex-col justify-center p-6">
                      {post.category && (
                        <span className="inline-block text-xs font-semibold text-[#00FF99] bg-[#00FF99]/10 px-3 py-1 rounded-full w-fit mb-3">
                          {post.category.name || post.category.title || "Uncategorized"}
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-gray-400 line-clamp-3">
                        {/* Strip HTML tags for excerpt */}
                        {post.content
                          ? post.content.replace(/<[^>]*>/g, "").substring(0, 200) + "..."
                          : ""}
                      </p>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <span>Read more →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
