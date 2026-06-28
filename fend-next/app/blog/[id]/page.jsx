"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SkeletonBlogDetail } from "../../../src/components/Skeleton";

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarPosts, setSimilarPosts] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/public/posts/${params.id}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);

          // Extract headings from HTML content for TOC
          if (data.content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.content, "text/html");
            const headingElements = doc.querySelectorAll("h1, h2, h3");
            const extractedHeadings = Array.from(headingElements).map(
              (h, index) => ({
                id: `heading-${index}`,
                text: h.textContent,
                level: parseInt(h.tagName[1]),
              })
            );
            setHeadings(extractedHeadings);
          }

          // Fetch similar posts from the same category
          if (data.category?._id) {
            const simRes = await fetch(
              `/api/public/posts?category=${data.category._id}&limit=4`
            );
            const simData = await simRes.json();
            if (simRes.ok && simData.posts) {
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

  // Add IDs to headings in the rendered content for TOC linking
  useEffect(() => {
    if (contentRef.current && headings.length > 0) {
      const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
      headingElements.forEach((el, index) => {
        if (index < headings.length) {
          el.id = headings[index].id;
        }
      });
    }
  }, [post, headings]);

  // Intersection Observer for active heading tracking
  useEffect(() => {
    if (!contentRef.current || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  // Inject IDs into content HTML before rendering
  const injectHeadingIds = (html) => {
    if (!html || !headings.length) return html;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headingElements = doc.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el, index) => {
      if (index < headings.length) {
        el.setAttribute("id", headings[index].id);
      }
    });
    return doc.body.innerHTML;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
          <SkeletonBlogDetail />
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
    <div className="min-h-screen">
      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-500 hover:text-[#00FF99] transition-colors mb-10"
          >
            <svg
              className="w-4 h-4 mr-1.5"
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

          {/* Two-column layout: TOC + Content */}
          <div className="flex gap-12 relative">
            {/* Left — Sticky TOC (Ramp-style) — Desktop only */}
            {headings.length > 1 && (
              <aside className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-24">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    On this page
                  </h4>
                  <nav className="space-y-1.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(h.id)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`block text-sm transition-colors duration-200 ${
                          h.level === 3 ? "pl-4" : h.level === 2 ? "pl-2" : ""
                        } ${
                          activeHeading === h.id
                            ? "text-[#00FF99]"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Right — Main Content */}
            <div className="flex-1 min-w-0">
              {/* Category */}
              {post.category && (
              <span className="inline-block text-xs font-medium text-[#00FF99] mb-3">
                {post.category.name || post.category.title || "Uncategorized"}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              {post.title}
            </h1>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              ref={contentRef}
              className="
                prose prose-invert max-w-none text-gray-300
                prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
                prose-a:text-[#00FF99] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-code:text-[#00FF99] prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                prose-blockquote:border-l-[#00FF99] prose-blockquote:text-gray-400 prose-blockquote:font-normal
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:mt-12 [&_h1]:mb-4
                [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-white/5
                [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:mt-8 [&_h3]:mb-2
                [&_p]:mb-5 [&_p]:leading-relaxed
                [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1.5
                [&_img]:my-8 [&_img]:mx-auto
                [&_hr]:border-white/10 [&_hr]:my-10
              "
              dangerouslySetInnerHTML={{
                __html: injectHeadingIds(post.content),
              }}
            />

            {/* Bottom section divider */}
            <div className="mt-16 pt-1" />
          </div>
        </div>

        {/* Similar Posts — Full width at bottom */}
        {similarPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/5">
            <h2 className="text-xl font-bold text-white mb-8">
              Similar Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {similarPosts.slice(0, 4).map((sp) => (
                <Link key={sp._id} href={`/blog/${sp._id}`}>
                  <div className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-200 hover:bg-white/[0.04] hover:border-white/10 cursor-pointer h-full flex flex-col">
                    {sp.category && (
                      <span className="text-[11px] font-medium text-[#00FF99] mb-2">
                        {sp.category.name ||
                          sp.category.title ||
                          "Uncategorized"}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white group-hover:text-[#00FF99] transition-colors duration-200 leading-snug line-clamp-2">
                      {sp.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2 flex-1">
                      {sp.content
                        ? sp.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 120) + "..."
                        : ""}
                    </p>
                    <div className="mt-3 text-xs text-gray-500 group-hover:text-[#00FF99] transition-colors">
                      Read more →
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
