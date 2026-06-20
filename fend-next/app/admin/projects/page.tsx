"use client";

import { useState, useEffect } from "react";

interface ProjectLink {
  title: string;
  url: string;
}

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  link?: string;
  links: ProjectLink[];
  tools?: string;
  site: string;
  displayOrder: number;
}

const CATEGORIES = ["All", "Blockchain", "Web Apps", "Software"];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Blockchain",
    description: "",
    image: "",
    link: "",
    links: [] as ProjectLink[],
    tools: "",
    site: "ruhul-dev",
    displayOrder: 1,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setForm((f) => ({ ...f, image: data.url }));
      } else {
        alert("Failed to upload image");
      }
    } catch {
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "Blockchain",
      description: "",
      image: "",
      link: "",
      links: [],
      tools: "",
      site: "ruhul-dev",
      displayOrder: projects.length + 1,
    });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      resetForm();
      setShowForm(false);
      fetchProjects();
    } else {
      alert("Failed to save project");
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image || "",
      link: project.link || "",
      links: project.links || [],
      tools: project.tools || "",
      site: project.site || "ruhul-dev",
      displayOrder: project.displayOrder,
    });
    setEditing(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  const addLink = () => {
    setForm((f) => ({ ...f, links: [...f.links, { title: "", url: "" }] }));
  };

  const updateLink = (index: number, field: keyof ProjectLink, value: string) => {
    const links = [...form.links];
    links[index] = { ...links[index], [field]: value };
    setForm((f) => ({ ...f, links }));
  };

  const removeLink = (index: number) => {
    setForm((f) => ({
      ...f,
      links: f.links.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Projects
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Add Project"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-4">
                {editing ? "Edit Project" : "Add New Project"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Site</label>
                    <select
                      value={form.site}
                      onChange={(e) => setForm((f) => ({ ...f, site: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="ruhul-dev">Ruhul Dev</option>
                      <option value="lisan">Lisan</option>
                      <option value="ruhul-scholarship">Ruhul Scholarship</option>
                      <option value="ruhul-blockchain">Ruhul Blockchain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={form.displayOrder}
                      onChange={(e) => setForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 0 }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      disabled={uploading}
                    />
                    {uploading && <p className="mt-1 text-sm text-gray-500">Uploading...</p>}
                    {form.image && (
                      <img src={form.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-md" />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL (or paste uploaded URL)</label>
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Main Link URL</label>
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tools / Tech Stack</label>
                  <input
                    type="text"
                    value={form.tools}
                    onChange={(e) => setForm((f) => ({ ...f, tools: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="React, Node.js, MongoDB..."
                  />
                </div>

                {/* Extra Links */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Additional Links</label>
                    <button
                      type="button"
                      onClick={addLink}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Link
                    </button>
                  </div>
                  {form.links.map((link, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(i, "title", e.target.value)}
                        placeholder="Link title (e.g. API)"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(i, "url", e.target.value)}
                        placeholder="URL"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      <button
                        type="button"
                        onClick={() => removeLink(i)}
                        className="px-2 py-1 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editing ? "Update Project" : "Create Project"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium mb-4">
              All Projects ({projects.length})
            </h3>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects yet. Add one above!</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4 flex-1 min-w-0">
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-medium text-gray-900">
                              #{project.displayOrder}. {project.title}
                            </h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              {project.category}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {project.site}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {project.description}
                          </p>
                          {project.tools && (
                            <p className="text-xs text-gray-400 mt-1">
                              {project.tools}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(project)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
