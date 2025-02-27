import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, BASE_API_URL } from '../../utils/constants';



const PostModal = ({ project, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="mt-2">{project.description}</p>
                <a href={project.link} className="text-blue-500 mt-4 inline-block">View Project</a>
                <button
                    onClick={closeModal}
                    className="mt-4 text-red-500 hover:text-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const PostList = () => {


    const [posts, setPosts] = useState([]);
    const [modalProject, setModalProject] = React.useState(null);
    const openModal = (project) => setModalProject(project);
    const closeModal = () => setModalProject(null);


    useEffect(() => {
        axios.get(`${API_URL}/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="max-w-6xl mx-auto my-8 pb-24">

            <h1 className="text-3xl font-bold my-6">Blog Posts</h1>
            <div className="grid  grid-cols-3 gap-8">

                {posts.map(post => (
                    // <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    //   {post.featureImage && (
                    //     <img src={`http://localhost:5001/${post.featureImage}`} alt={post.title} className="mb-4 rounded-lg" />
                    //   )}
                    //   <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    //   <div
                    //     className="text-gray-700 mb-4"
                    //     dangerouslySetInnerHTML={{ __html: post.content }}
                    //   ></div>
                    //      <small className="text-gray-500">{new Date(post.date).toLocaleDateString()}</small>
                    // </div>
                    <div className='flex flex-row justify-start items-start white-glassmorphism     cursor-pointer hover:shadow-xl h-full w-full'>

                        <div
                            key={post.id}
                            className="relative w-full  h-96 perspective   flex flex-col flex-1"
                        >
                            <div className="flip-card w-full h-full transform transition-transform duration-500">

                                <div className="flip-front absolute w-full h-full bg-white-glassmorphism   cursor-pointer hover:shadow-xl flex flex-col">
                                    <img
                                        src={`${BASE_API_URL}/${post.featureImage}`}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-t-2xl"
                                    />
                                    <h3 className="mt-2 text-primary-color text-lg p-3 leading-5">
                                        {post.title}
                                    </h3>
                                    <h4 className="mt-2 text-primary-color text-sm">
                                        {post.category}
                                    </h4>
                                    <p className="mt-1 text-white text-sm md:w-full">
                                        {post.description}
                                    </p>
                                </div>


                                <div className="flip-back absolute w-full h-full bg-gray-800 p-4 rounded-2xl flex items-center justify-center">
                                    <button
                                        className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-dark"
                                        onClick={() => alert(`Read more about ${project.title}`)}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>




                ))}
            </div>
        </div>
    );
};

export default PostList;