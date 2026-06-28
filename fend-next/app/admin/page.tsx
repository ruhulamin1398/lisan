"use client";

import Link from "next/link";
import {
  DocumentTextIcon,
  TagIcon,
  ChartBarIcon,
  EnvelopeIcon,
  Squares2X2Icon,
  CodeBracketSquareIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { StatsSkeleton } from "@/components/AdminSkeleton";

interface Stat {
  name: string;
  value: string;
  icon: any;
  href: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([
    {
      name: "Total Posts",
      value: "0",
      icon: DocumentTextIcon,
      href: "/admin/posts/list",
    },
    {
      name: "Categories",
      value: "0",
      icon: TagIcon,
      href: "/admin/categories/list",
    },
    {
      name: "Published Posts",
      value: "0",
      icon: ChartBarIcon,
      href: "/admin/posts/list",
    },
    {
      name: "Contact Messages",
      value: "0",
      icon: EnvelopeIcon,
      href: "/admin/contact-messages/list",
    },
    {
      name: "Project Categories",
      value: "0",
      icon: Squares2X2Icon,
      href: "/admin/project-categories/list",
    },
    {
      name: "Projects",
      value: "0",
      icon: CodeBracketSquareIcon,
      href: "/admin/projects",
    },
    {
      name: "Uploads",
      value: "0",
      icon: PhotoIcon,
      href: "/admin/files",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentPostsLoading, setRecentPostsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentPosts();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch posts
      const postsRes = await fetch("/api/posts");
      const posts = postsRes.ok ? await postsRes.json() : [];

      // Fetch categories
      const categoriesRes = await fetch("/api/categories");
      const categories = categoriesRes.ok ? await categoriesRes.json() : [];

      // Fetch contact messages
      const messagesRes = await fetch("/api/contact-messages");
      const messages = messagesRes.ok ? await messagesRes.json() : [];

      // Fetch project categories
      const projectCatRes = await fetch("/api/project-categories");
      const projectCategories = projectCatRes.ok ? await projectCatRes.json() : [];

      // Fetch projects
      const projRes = await fetch("/api/projects");
      const projects = projRes.ok ? await projRes.json() : [];

      // Fetch files/uploads
      const filesRes = await fetch("/api/files");
      const files = filesRes.ok ? await filesRes.json() : [];

      // Calculate published posts
      const publishedPosts = posts.filter((post: any) => post.published).length;

      setStats([
        {
          name: "Total Posts",
          value: posts.length.toString(),
          icon: DocumentTextIcon,
          href: "/posts/list",
        },
        {
          name: "Categories",
          value: categories.length.toString(),
          icon: TagIcon,
          href: "/categories/list",
        },
        {
          name: "Published Posts",
          value: publishedPosts.toString(),
          icon: ChartBarIcon,
          href: "/posts/list",
        },
        {
          name: "Contact Messages",
          value: messages.length.toString(),
          icon: EnvelopeIcon,
          href: "/contact-messages/list",
        },
        {
          name: "Project Categories",
          value: (Array.isArray(projectCategories) ? projectCategories.length : 0).toString(),
          icon: Squares2X2Icon,
          href: "/project-categories/list",
        },
        {
          name: "Projects",
          value: (Array.isArray(projects) ? projects.length : 0).toString(),
          icon: CodeBracketSquareIcon,
          href: "/projects",
        },
        {
          name: "Uploads",
          value: (Array.isArray(files) ? files.length : 0).toString(),
          icon: PhotoIcon,
          href: "/files",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const posts = await res.json();
        // Get the 5 most recent posts
        const recent = posts.slice(0, 5);
        setRecentPosts(recent);
      }
    } catch (error) {
      console.error("Failed to fetch recent posts:", error);
    } finally {
      setRecentPostsLoading(false);
    }
  };
  return loading ? (
    <StatsSkeleton />
  ) : (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Posts
              </h3>
              <div className="mt-5">
                {recentPostsLoading ? (
                  <div className="animate-pulse space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                            <div className="h-3 bg-gray-200 rounded w-full" />
                          </div>
                          <div className="ml-4">
                            <div className="h-6 w-20 bg-gray-200 rounded-full" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentPosts.length > 0 ? (
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div
                        key={post._id}
                        className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Category:{" "}
                              {post.category
                                ? post.category.name
                                : "No Category"}
                            </p>
                            <div
                              className="text-sm text-gray-700 mt-1 line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: post.content.substring(0, 100) + "...",
                              }}
                            />
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                post.published
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {post.published ? "Published" : "Draft"}
                            </span>
                            <Link
                              href={`/admin/posts/edit/${post._id}`}
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No posts yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quick Actions
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/admin/posts/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Post
                </Link>
                <Link
                  href="/admin/categories/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <TagIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
