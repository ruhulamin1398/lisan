import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <CreatePost />
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
    <div className="grid  grid-cols-3 gap-2">

        {posts.map(post => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          {post.featureImage && (
            <img src={`http://localhost:5000/${post.featureImage}`} alt={post.title} className="mb-4 rounded-lg" />
          )}
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
             <small className="text-gray-500">{new Date(post.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
    </div>
  );
};

export default PostList;