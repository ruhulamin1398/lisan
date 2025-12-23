'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Category {
    _id: string
    name: string
    description: string
    image?: string
}

export default function EditCategory() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)

    useEffect(() => {
        fetchCategory()
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            const res = await fetch(`/api/categories/${categoryId}`)
            if (res.ok) {
                const category: Category = await res.json()
                setName(category.name)
                setDescription(category.description)
                setImage(category.image || '')
            } else {
                alert('Category not found')
                router.push('/categories/list')
            }
        } catch (error) {
            console.error('Failed to fetch category:', error)
            alert('Failed to load category')
        } finally {
            setFetchLoading(false)
        }
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
        setLoading(true)

        try {
            const res = await fetch(`/api/categories/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, image }),
            })

            if (res.ok) {
                router.push('/categories/list')
            } else {
                alert('Failed to update category')
            }
        } catch (error) {
            console.error('Failed to update category:', error)
            alert('Failed to update category')
        } finally {
            setLoading(false)
        }
    }

    if (fetchLoading) {
        return (
            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                            <Link
                                href="/categories/list"
                                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                    Edit Category
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update your category information
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
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Category Details</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Update your category information.
                                    </p>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                                placeholder="Optional description for the category"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category Image
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
                                                <div className="mt-2">
                                                    <img
                                                        src={image}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-cover rounded-md"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/categories/list"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}