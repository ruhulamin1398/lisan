"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PageSkeleton } from "@/components/AdminSkeleton";

interface ServiceType {
  _id: string;
  name: string;
  description?: string;
  active: boolean;
  createdAt: string;
}

export default function ServiceTypesList() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const res = await fetch("/api/service-types");
      if (res.ok) {
        const data = await res.json();
        setServiceTypes(data);
      }
    } catch (error) {
      console.error("Failed to fetch service types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service type?")) return;

    try {
      const res = await fetch(`/api/service-types/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setServiceTypes(serviceTypes.filter((type) => type._id !== id));
      } else {
        alert("Failed to delete service type");
      }
    } catch (error) {
      alert("Failed to delete service type");
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/service-types/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (res.ok) {
        const updatedType = await res.json();
        setServiceTypes(
          serviceTypes.map((type) => (type._id === id ? updatedType : type)),
        );
      }
    } catch (error) {
      alert("Failed to update service type");
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Service Types
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage service types for contact forms
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/admin/service-types/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Service Type
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {serviceTypes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No service types yet</p>
              <Link
                href="/admin/service-types/add"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add First Service Type
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {serviceTypes.map((type) => (
                  <li key={type._id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {type.name}
                            </p>
                            {!type.active && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </div>
                          {type.description && (
                            <p className="mt-1 text-sm text-gray-500">
                              {type.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleActive(type._id, type.active)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              type.active
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {type.active ? "Active" : "Inactive"}
                          </button>
                          <Link
                            href={`/admin/service-types/edit/${type._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(type._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
