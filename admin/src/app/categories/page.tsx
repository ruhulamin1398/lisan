'use client'

import { useState, useEffect } from 'react'

interface Category {
    _id: string
    name: string
    description: string
    image?: string
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (res.ok) {
                setImage(data.url)
            } else {
                alert('Failed to upload image')
            }
        } catch (error) {
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, image }),
        })
        if (res.ok) {
            setName('')
            setDescription('')
            setImage('')
            fetchCategories()
        }
    }

    const handleDelete = async (id: string) => {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' })
        fetchCategories()
    }

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Categories
                        </h1>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Add Category Form */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Add New Category
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                        disabled={uploading}
                                    />
                                    {uploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
                                    {image && (
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="mt-2 w-20 h-20 object-cover rounded-md"
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Add Category
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                All Categories ({categories.length})
                            </h3>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {categories.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No categories yet</p>
                                ) : (
                                    categories.map((cat) => (
                                        <div key={cat._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start space-x-3">
                                                    {cat.image && (
                                                        <img
                                                            src={cat.image}
                                                            alt={cat.name}
                                                            className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-900">{cat.name}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(cat._id)}
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
    )
}