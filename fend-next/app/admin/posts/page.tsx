"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import DropzoneUpload from "@/components/admin/DropzoneUpload";

interface Category {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  published: boolean;
  image?: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, category, published, image, imagePrompt }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      setCategory("");
      setPublished(false);
      setImage("");
      setImagePrompt("");
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Posts
            </h1>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Add Post Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Add New Post
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <DropzoneUpload
                    onUploadComplete={setImage}
                    currentImage={image}
                  />
                </div>

                <div>
                  <label
                    htmlFor="imagePrompt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Prompt
                  </label>
                  <textarea
                    id="imagePrompt"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    rows={2}
                    placeholder="Optional: AI image prompt"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="published"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Published
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Post
                </button>
              </form>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                All Posts ({posts.length})
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No posts yet</p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Category:{" "}
                            {post.category ? post.category.name : "No Category"}
                          </p>
                          <div
                            className="text-sm text-gray-700 mt-1 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: post.content.substring(0, 100) + "...",
                            }}
                          />
                          {post.image && (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded mt-2"
                            />
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Status: {post.published ? "Published" : "Draft"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="ml-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
