'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PencilIcon, TrashIcon, PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { PageSkeleton } from '@/components/AdminSkeleton'

interface Category {
    _id: string
    name: string
}

interface Post {
    _id: string
    title: string
    content: string
    category: Category
    published: boolean
    image?: string
    imagePrompt?: string
    createdAt?: string
}

export default function PostsList() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts')
            if (res.ok) {
                const data = await res.json()
                setPosts(Array.isArray(data) ? data : [])
            } else {
                console.error('Failed to fetch posts:', res.status)
                setPosts([])
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            setPosts([])
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            await fetch(`/api/posts/${id}`, { method: 'DELETE' })
            fetchPosts()
        } catch (error) {
            console.error('Failed to delete post:', error)
            alert('Failed to delete post')
        }
    }

    if (loading) {
        return <PageSkeleton />
    }

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Posts
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your blog posts
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            href="/admin/posts/add"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                            Add Post
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {posts.length === 0 ? (
                                <li className="px-6 py-8 text-center">
                                    <div className="text-gray-500">
                                        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
                                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
                                        <div className="mt-6">
                                            <Link
                                                href="/admin/posts/add"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                                Add Post
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                posts.map((post) => (
                                    <li key={post._id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {post.image && (
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="h-12 w-12 rounded-lg object-cover mr-4"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {post.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            Category: {post.category ? post.category.name : 'No Category'}
                                                        </p>
                                                        <div
                                                            className="text-sm text-gray-600 mt-1 line-clamp-2"
                                                            dangerouslySetInnerHTML={{
                                                                __html: post.content.substring(0, 150) + '...'
                                                            }}
                                                        />
                                                        {post.imagePrompt && (
                                                            <p className="text-xs text-gray-400 mt-1 italic truncate">
                                                                Prompt: {post.imagePrompt.substring(0, 80)}...
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {post.published ? 'Published' : 'Draft'}
                                                    </span>
                                                    <Link
                                                        href={`/admin/posts/edit/${post._id}`}
                                                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        <PencilIcon className="-ml-0.5 mr-1 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <TrashIcon className="-ml-0.5 mr-1 h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}