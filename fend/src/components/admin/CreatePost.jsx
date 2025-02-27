import React, { useState } from 'react';
import axios from 'axios';
import RichTextEditor from './RichTextEditor';
import { API_URL } from '../../utils/constants';
import useUser from '../../hooks/useUser';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('featureImage', featureImage);

    try {
      let authToken = localStorage.getItem('token');
      console.log(authToken);
      const response = await axios.post(
        `${API_URL}/posts`,
        formData, // Pass formData as the body of the request
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add Authorization header here
            "Content-Type": "multipart/form-data", // Ensure correct content type if using formData
          },
        }
      );
      console.log('Post created:', response.data);
      setTitle('');
      setContent('');
      setFeatureImage(null);
      setError(null);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Feature Image</label>
        <input
          type="file"
          onChange={(e) => setFeatureImage(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;