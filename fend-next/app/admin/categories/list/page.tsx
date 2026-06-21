"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { PageSkeleton } from "@/components/AdminSkeleton";

interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
  displayOrder: number;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch categories:", res.status);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Categories
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your blog categories
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/admin/categories/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Category
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <li className="px-6 py-8 text-center">
                  <div className="text-gray-500">
                    <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No categories
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new category.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/admin/categories/add"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Add Category
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                categories.map((category) => (
                  <li key={category._id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {category.image && (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-green-100 text-green-800">
                                {category.displayOrder}
                              </span>
                              <p className="text-sm font-medium text-gray-900">
                                {category.name}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              {category.description || "No description"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/categories/edit/${category._id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <PencilIcon className="-ml-0.5 mr-1 h-4 w-4" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(category._id)}
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
  );
}
