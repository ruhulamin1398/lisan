"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SkeletonBlogDetail } from "../../../src/components/Skeleton";

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    if (!params?.id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/public/posts/${params.id}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);

          // Fetch similar posts from the same category
          if (data.category?._id) {
            const simRes = await fetch(
              `/api/public/posts?category=${data.category._id}&limit=4`
            );
            const simData = await simRes.json();
            if (simRes.ok && simData.posts) {
              // Exclude current post
              setSimilarPosts(
                simData.posts.filter((p) => p._id !== params.id)
              );
            }
          }
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
      <div className="min-h-screen flex justify-center px-4 py-10">
        <SkeletonBlogDetail />
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

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Category — after title */}
        {post.category && (
          <span className="inline-block text-xs font-semibold text-[#00FF99] bg-[#00FF99]/10 px-3 py-1 rounded-full mb-8">
            {post.category.name || post.category.title || "Uncategorized"}
          </span>
        )}

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

        {/* Similar Posts */}
        {similarPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8">
              Similar Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {similarPosts.slice(0, 4).map((sp) => (
                <Link key={sp._id} href={`/blog/${sp._id}`}>
                  <div className="group rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden bg-slate-900 shrink-0">
                      {sp.image ? (
                        <img
                          src={sp.image}
                          alt={sp.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
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
                    <div className="p-4 flex flex-col flex-1">
                      {sp.category && (
                        <span className="text-[10px] font-semibold text-[#00FF99] bg-[#00FF99]/10 px-2 py-0.5 rounded-full w-fit mb-2">
                          {sp.category.name ||
                            sp.category.title ||
                            "Uncategorized"}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200 leading-snug line-clamp-2">
                        {sp.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2 flex-1">
                        {sp.content
                          ? sp.content
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 100) + "..."
                          : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
