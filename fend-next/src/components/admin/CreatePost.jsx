"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import RichTextEditor from "./RichTextEditor";
import DropzoneUpload from "./DropzoneUpload";
import { API_URL } from "../../utils/constants";
import useUser from "../../hooks/useUser";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [featureImage, setFeatureImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setUploading(true);

    try {
      // Create post with the Cloudinary image URL (already uploaded via DropzoneUpload)
      let authToken = localStorage.getItem("token");

      const postData = {
        title,
        content,
        published: true,
        ...(featureImage && { image: featureImage }),
        ...(category && { category }),
      };

      const response = await axios.post(`${API_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Post created:", response.data);
      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
      setCategory("");
      setFeatureImage("");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        error.response?.data?.error ||
          "Failed to create post. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

      {error && (
        <p className="text-red-500 bg-red-50 p-3 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-500 bg-green-50 p-3 rounded">{success}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Feature Image
        </label>
        <DropzoneUpload
          onUploadComplete={setFeatureImage}
          currentImage={featureImage}
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading image..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePost;
