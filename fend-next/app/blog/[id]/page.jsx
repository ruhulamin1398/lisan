"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/public/posts/${params.id}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);
        } else {
          setError(data.error || "Post not found");
        }
      } catch (err) {
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-[#00FF99] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-base">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
          <Link
            href="/blog"
            className="mt-6 inline-block text-[#00FF99] hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-[#00FF99] transition-colors mb-8 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Category */}
        {post.category && (
          <span className="inline-block text-xs font-semibold text-[#00FF99] bg-[#00FF99]/10 px-3 py-1 rounded-full mb-4">
            {post.category.name || post.category.title || "Uncategorized"}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
          {post.title}
        </h1>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-300
            prose-headings:text-white prose-headings:font-bold
            prose-a:text-[#00FF99] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-[#00FF99] prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-[#00FF99] prose-blockquote:text-gray-400
            prose-img:rounded-xl prose-img:border prose-img:border-white/10
            [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:mt-10 [&_h1]:mb-4
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-8 [&_h2]:mb-3
            [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:mb-1
            [&_img]:my-6 [&_img]:mx-auto
            [&_hr]:border-white/10 [&_hr]:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
