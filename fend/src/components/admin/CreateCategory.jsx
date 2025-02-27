import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';

const CreateCategory = () => {
    const [formData, setFormData] = useState({
        title: '',
        des: '',
        featureImage: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'featureImage') {
            setFormData((prevState) => ({
                ...prevState,
                featureImage: files[0], // Handle file input
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token'); // Fetch token from localStorage
            if (!token) {
                navigate('/login');
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('des', formData.des);
            if (formData.featureImage) {
                formDataToSend.append('featureImage', formData.featureImage);
            }

            const response = await axios.post(`${API_URL}/categories`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setMessage('Category created successfully!');
                // navigate('/admin/categories'); // Redirect to categories list page
            }
        } catch (error) {
            console.error('Error creating category:', error);
            setMessage('Failed to create category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>
            {message && (
                <div
                    className={`p-4 rounded mb-4 ${message.startsWith('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}
                >
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="des" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="des"
                        name="des"
                        value={formData.des}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="featureImage" className="block text-sm font-medium text-gray-700">
                        Feature Image
                    </label>
                    <input
                        type="file"
                        id="featureImage"
                        name="featureImage"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Creating...' : 'Create Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;
