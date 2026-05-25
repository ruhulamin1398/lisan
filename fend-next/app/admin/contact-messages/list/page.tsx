"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EyeIcon, TrashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: {
    _id: string;
    name: string;
  };
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactMessagesList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact-messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      alert("Failed to delete message");
    }
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact-messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });

      if (res.ok) {
        const updatedMessage = await res.json();
        setMessages(
          messages.map((msg) => (msg._id === id ? updatedMessage : msg)),
        );
      }
    } catch (error) {
      alert("Failed to update message status");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.read;
    if (filter === "read") return msg.read;
    return true;
  });

  if (loading) {
    return (
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Contact Messages
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage contact form submissions
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === "unread"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Unread ({messages.filter((m) => !m.read).length})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === "read"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Read ({messages.filter((m) => m.read).length})
            </button>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <EnvelopeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No messages
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === "all"
                  ? "No contact messages yet."
                  : filter === "unread"
                    ? "No unread messages."
                    : "No read messages."}
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <li
                    key={message._id}
                    className={`${!message.read ? "bg-blue-50" : ""}`}
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {message.name}
                            </p>
                            {!message.read && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {message.email} • {message.serviceType.name}
                            {message.phone && ` • ${message.phone}`}
                          </p>
                          <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                            {message.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {new Date(message.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <button
                            onClick={() =>
                              toggleRead(message._id, message.read)
                            }
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              message.read
                                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }`}
                          >
                            {message.read ? "Mark Unread" : "Mark Read"}
                          </button>
                          <Link
                            href={`/admin/contact-messages/${message._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(message._id)}
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
