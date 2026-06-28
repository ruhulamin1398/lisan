"use client";

import { useState, useEffect, useCallback } from "react";
import {
  PhotoIcon,
  DocumentIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XCircleIcon,
  ArrowPathIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";

interface FileRecord {
  _id: string;
  title: string;
  url: string;
  publicId?: string;
  type: string;
  mimeType: string;
  size?: number;
  width?: number;
  height?: number;
  alt?: string;
  source: string;
  sourceId?: string;
  sourcePath?: string;
  site?: string;
  createdAt: string;
  updatedAt: string;
}

const FILE_SOURCES = ["All", "General", "Projects", "Blog", "Logos", "Services"];

function formatFileSize(bytes?: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFileIcon(type: string) {
  switch (type) {
    case "image":
      return <PhotoIcon className="h-10 w-10 text-green-400" />;
    case "video":
      return <VideoCameraIcon className="h-10 w-10 text-blue-400" />;
    case "document":
      return <DocumentTextIcon className="h-10 w-10 text-orange-400" />;
    default:
      return <DocumentIcon className="h-10 w-10 text-gray-400" />;
  }
}

export default function FileManager() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", alt: "", source: "", sourcePath: "" });
  const [uploading, setUploading] = useState(false);
  const [replacing, setReplacing] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    source: "General",
    sourcePath: "",
    alt: "",
    site: "ruhul-dev",
  });
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (sourceFilter !== "All") params.set("source", sourceFilter);
      if (typeFilter !== "All") params.set("type", typeFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/files?${params}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setLoading(false);
    }
  }, [search, sourceFilter, typeFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchFiles, 300);
    return () => clearTimeout(timeout);
  }, [fetchFiles]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById("upload-file-input") as HTMLInputElement;
    if (!fileInput?.files?.[0]) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("title", uploadForm.title || fileInput.files[0].name);
    formData.append("source", uploadForm.source);
    formData.append("sourcePath", uploadForm.sourcePath);
    formData.append("alt", uploadForm.alt);
    formData.append("site", uploadForm.site);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Upload failed");
      } else {
        setShowUploadModal(false);
        setUploadForm({ title: "", source: "General", sourcePath: "", alt: "", site: "ruhul-dev" });
        if (fileInput) fileInput.value = "";
        fetchFiles();
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById("replace-file-input") as HTMLInputElement;
    if (!fileInput?.files?.[0] || !replacing) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("source", "Replace");
    formData.append("title", "Replacement");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        alert("Replace upload failed");
        return;
      }
      const data = await res.json();

      // Delete old file record (Cloudinary cleanup is in DELETE handler)
      await fetch(`/api/files/${replacing}`, { method: "DELETE" });

      // Update the new file's metadata to match old one
      const oldFile = files.find((f) => f._id === replacing);
      if (oldFile) {
        await fetch(`/api/files/${data.file._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: oldFile.title,
            source: oldFile.source,
            sourcePath: oldFile.sourcePath,
            alt: oldFile.alt,
            site: oldFile.site,
            sourceId: oldFile.sourceId,
          }),
        });
      }

      setReplacing(null);
      if (fileInput) fileInput.value = "";
      fetchFiles();
    } catch {
      alert("Replace failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleting) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const startEdit = (file: FileRecord) => {
    setEditing(file._id);
    setEditForm({
      title: file.title,
      alt: file.alt || "",
      source: file.source,
      sourcePath: file.sourcePath || "",
    });
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/files/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setEditing(null);
        fetchFiles();
      } else {
        alert("Failed to update");
      }
    } catch {
      alert("Failed to update");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({ title: "", alt: "", source: "", sourcePath: "" });
  };

  const getSourceBadgeClass = (source: string) => {
    switch (source) {
      case "Projects": return "bg-blue-100 text-blue-800";
      case "Blog": return "bg-purple-100 text-purple-800";
      case "Logos": return "bg-amber-100 text-amber-800";
      case "Services": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            File Manager
          </h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" />
            Upload File
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files by title, source..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Source Filter */}
              <div className="sm:w-40">
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {FILE_SOURCES.map((s) => (
                    <option key={s} value={s}>{s === "All" ? "All Sources" : s}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="sm:w-36">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Types</option>
                  <option value="image">Images</option>
                  <option value="document">Documents</option>
                  <option value="video">Videos</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* File Grid */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {loading ? "Loading..." : `${files.length} file${files.length !== 1 ? "s" : ""}`}
              </h3>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-md mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-16">
                <FolderOpenIcon className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500 text-lg">No files found</p>
                <p className="text-gray-400 text-sm mt-1">
                  {sourceFilter !== "All"
                    ? `No files in "${sourceFilter}" source. Upload one above!`
                    : "Upload your first file to get started."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {files.map((file) => (
                  <div
                    key={file._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group bg-white"
                  >
                    {/* Preview / Thumbnail */}
                    <div
                      className="h-36 bg-gray-100 relative overflow-hidden cursor-pointer"
                      onClick={() => file.type === "image" && setPreview(file.url)}
                    >
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.alt || file.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      {/* Hover overlay with actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        {file.type === "image" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setPreview(file.url); }}
                            className="p-1.5 bg-white/90 rounded-md hover:bg-white text-gray-700"
                            title="Preview"
                          >
                            <PhotoIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); setReplacing(file._id); }}
                          className="p-1.5 bg-white/90 rounded-md hover:bg-white text-gray-700"
                          title="Replace file"
                        >
                          <ArrowPathIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(file._id); }}
                          disabled={deleting === file._id}
                          className="p-1.5 bg-red-100/90 rounded-md hover:bg-red-200 text-red-700"
                          title="Delete"
                        >
                          <TrashIcon className={`h-5 w-5 ${deleting === file._id ? "animate-spin" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="p-3">
                      {editing === file._id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                            className="w-full text-sm border border-blue-300 rounded px-2 py-1"
                            placeholder="Title"
                            autoFocus
                          />
                          <input
                            type="text"
                            value={editForm.alt}
                            onChange={(e) => setEditForm((f) => ({ ...f, alt: e.target.value }))}
                            className="w-full text-xs border border-blue-300 rounded px-2 py-1"
                            placeholder="Alt text"
                          />
                          <select
                            value={editForm.source}
                            onChange={(e) => setEditForm((f) => ({ ...f, source: e.target.value }))}
                            className="w-full text-xs border border-blue-300 rounded px-2 py-1"
                          >
                            {FILE_SOURCES.filter((s) => s !== "All").map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={editForm.sourcePath}
                            onChange={(e) => setEditForm((f) => ({ ...f, sourcePath: e.target.value }))}
                            className="w-full text-xs border border-blue-300 rounded px-2 py-1"
                            placeholder="Source path (e.g. Projects > MuslimBD)"
                          />
                          <div className="flex gap-1 pt-1">
                            <button
                              onClick={() => saveEdit(file._id)}
                              className="flex-1 inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                              <CheckIcon className="h-3 w-3 mr-1" /> Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                              <XCircleIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate flex-1" title={file.title}>
                              {file.title}
                            </h4>
                            <button
                              onClick={() => startEdit(file)}
                              className="ml-1 p-0.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              title="Edit metadata"
                            >
                              <PencilIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Source badge */}
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSourceBadgeClass(file.source)}`}>
                              {file.source}
                            </span>
                            {file.type === "image" && file.width && file.height && (
                              <span className="text-xs text-gray-400">
                                {file.width}×{file.height}
                              </span>
                            )}
                          </div>

                          {/* Source path */}
                          {file.sourcePath && (
                            <p className="text-xs text-gray-400 mt-1 truncate" title={file.sourcePath}>
                              📁 {file.sourcePath}
                            </p>
                          )}

                          {/* Meta row */}
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                            <span>{formatFileSize(file.size)}</span>
                            <span>{formatDate(file.createdAt)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowUploadModal(false)} />
            <div className="relative bg-white rounded-lg max-w-lg w-full p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Upload File</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File *</label>
                  <input
                    id="upload-file-input"
                    type="file"
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Leave blank to use filename"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={uploadForm.source}
                      onChange={(e) => setUploadForm((f) => ({ ...f, source: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      {FILE_SOURCES.filter((s) => s !== "All").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
                    <select
                      value={uploadForm.site}
                      onChange={(e) => setUploadForm((f) => ({ ...f, site: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="ruhul-dev">Ruhul Dev</option>
                      <option value="lisan">Lisan</option>
                      <option value="ruhul-scholarship">Ruhul Scholarship</option>
                      <option value="ruhul-blockchain">Ruhul Blockchain</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Path <span className="text-gray-400 font-normal">{'(e.g. Projects > MuslimBD)'}</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.sourcePath}
                    onChange={(e) => setUploadForm((f) => ({ ...f, sourcePath: e.target.value }))}
                    placeholder="Where does this file belong?"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={uploadForm.alt}
                    onChange={(e) => setUploadForm((f) => ({ ...f, alt: e.target.value }))}
                    placeholder="Descriptive text for accessibility"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading ? (
                    <>Uploading...</>
                  ) : (
                    <><ArrowUpTrayIcon className="h-4 w-4 mr-2" /> Upload</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Replace Modal */}
      {replacing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setReplacing(null)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Replace File</h3>
                <button onClick={() => setReplacing(null)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleReplace}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload replacement *</label>
                  <input
                    id="replace-file-input"
                    type="file"
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  The old file will be deleted from Cloudinary and replaced. All metadata (title, source, etc.) will be preserved.
                </p>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Replace File"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setPreview(null)}>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-80" />
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-3 -right-3 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-700" />
              </button>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
