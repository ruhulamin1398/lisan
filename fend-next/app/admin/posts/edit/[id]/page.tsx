"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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
  imagePrompt?: string;
}

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const post: Post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category ? post.category._id : "");
        setPublished(post.published);
        setImage(post.image || "");
        setImagePrompt(post.imagePrompt || "");
      } else {
        alert("Post not found");
        router.push("/admin/posts/list");
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
      alert("Failed to load post");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImage(data.url);
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, published, image, imagePrompt }),
      });

      if (res.ok) {
        router.push("/admin/posts/list");
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <Link
                href="/admin/posts/list"
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Edit Post
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Update your blog post
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Post Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your post information.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 text-black bg-white"
                        required
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 text-black bg-white"
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

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                      </label>
                      <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 text-black bg-white"
                        required
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={uploading}
                      />
                      {uploading && (
                        <p className="mt-2 text-sm text-gray-500">
                          Uploading...
                        </p>
                      )}
                      {image && (
                        <div className="mt-2">
                          <img
                            src={image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-span-6">
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
                        rows={3}
                        placeholder="Optional: Describe the AI-generated image for this post"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 text-black bg-white"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Used for generating the featured image via AI. Leave empty to use the uploaded image.
                      </p>
                    </div>

                    <div className="col-span-6">
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
                          Publish post
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/posts/list"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
