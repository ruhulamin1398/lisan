"use client";

import { useState, useEffect } from "react";
import {
  AVAILABLE_LOGOS,
  LogoPreview,
} from "@/components/LogoRegistry";

interface Logo {
  _id: string;
  title: string;
  logoType: string;
  logoKey: string;
  customStyle: string;
  displayOrder: number;
  site: string;
}

const SITES = ["ruhul-dev", "lisan", "ruhul-scholarship", "ruhul-blockchain"];
const CUSTOM_STYLE_PRESETS = [
  { label: "Default (gray)", value: "text-[#c8c8c8]" },
  { label: "White", value: "text-white" },
  { label: "Blue", value: "text-blue-400" },
  { label: "Green", value: "text-green-400" },
  { label: "Custom", value: "__custom__" },
];

export default function AdminLogos() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [editing, setEditing] = useState<Logo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [customStyleInput, setCustomStyleInput] = useState(false);

  const [form, setForm] = useState({
    title: "",
    logoType: "icon",
    logoKey: "ethereum",
    customStyle: "text-[#c8c8c8]",
    displayOrder: 1,
    site: "ruhul-dev",
  });

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    const res = await fetch("/api/logos");
    const data = await res.json();
    setLogos(data);
  };

  const resetForm = () => {
    setForm({
      title: "",
      logoType: "icon",
      logoKey: "ethereum",
      customStyle: "text-[#c8c8c8]",
      displayOrder: logos.length + 1,
      site: "ruhul-dev",
    });
    setEditing(null);
    setCustomStyleInput(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/logos/${editing._id}` : "/api/logos";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      resetForm();
      setShowForm(false);
      fetchLogos();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to save logo");
    }
  };

  const handleEdit = (logo: Logo) => {
    setForm({
      title: logo.title,
      logoType: logo.logoType,
      logoKey: logo.logoKey,
      customStyle: logo.customStyle,
      displayOrder: logo.displayOrder,
      site: logo.site,
    });
    setEditing(logo);
    setShowForm(true);
    setCustomStyleInput(
      !CUSTOM_STYLE_PRESETS.some((p) => p.value === logo.customStyle)
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this logo?")) return;
    await fetch(`/api/logos/${id}`, { method: "DELETE" });
    fetchLogos();
  };

  // When logoKey or logoType changes, auto-fill title from available logos
  const handleLogoKeyChange = (key: string, type: string) => {
    setForm((f) => ({ ...f, logoKey: key, logoType: type }));
    const found = AVAILABLE_LOGOS.find((l) => l.key === key);
    if (found && !editing) {
      setForm((f) => ({ ...f, title: found.title, logoKey: key, logoType: type }));
    }
  };

  // Filter available logos by selected type
  const filteredLogos = form.logoType
    ? AVAILABLE_LOGOS.filter((l) => l.type === form.logoType)
    : AVAILABLE_LOGOS;

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Logos / Tech Stack
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Add Logo"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-4">
                {editing ? "Edit Logo" : "Add New Logo"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Logo Type
                    </label>
                    <select
                      value={form.logoType}
                      onChange={(e) => {
                        const type = e.target.value;
                        setForm((f) => ({ ...f, logoType: type }));
                        // Reset logoKey to first available of this type
                        const first = AVAILABLE_LOGOS.find(
                          (l) => l.type === type
                        );
                        if (first) {
                          setForm((f) => ({
                            ...f,
                            logoType: type,
                            logoKey: first.key,
                          }));
                        }
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="icon">Icon (react-icons)</option>
                      <option value="image">Image</option>
                      <option value="svg">SVG</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Logo
                    </label>
                    <select
                      value={form.logoKey}
                      onChange={(e) =>
                        handleLogoKeyChange(
                          e.target.value,
                          form.logoType
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      {filteredLogos.map((logo) => (
                        <option key={logo.key} value={logo.key}>
                          {logo.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Site
                    </label>
                    <select
                      value={form.site}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, site: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      {SITES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={form.displayOrder}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          displayOrder: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Style
                    </label>
                    {customStyleInput ? (
                      <input
                        type="text"
                        value={form.customStyle}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            customStyle: e.target.value,
                          }))
                        }
                        placeholder="e.g. text-[#c8c8c8]"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    ) : (
                      <select
                        value={
                          CUSTOM_STYLE_PRESETS.some(
                            (p) => p.value === form.customStyle
                          )
                            ? form.customStyle
                            : "__custom__"
                        }
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setCustomStyleInput(true);
                          } else {
                            setForm((f) => ({
                              ...f,
                              customStyle: e.target.value,
                            }));
                          }
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        {CUSTOM_STYLE_PRESETS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {customStyleInput && (
                      <button
                        type="button"
                        onClick={() => setCustomStyleInput(false)}
                        className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                      >
                        Use presets instead
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <LogoPreview
                    logoType={form.logoType}
                    logoKey={form.logoKey}
                    customStyle={form.customStyle}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {form.title || "No title set"}
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editing ? "Update Logo" : "Create Logo"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Logos List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium mb-4">
              All Logos ({logos.length})
            </h3>
            <div className="space-y-4">
              {logos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No logos yet. Add one above!
                </p>
              ) : (
                logos.map((logo) => (
                  <div
                    key={logo._id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <LogoPreview
                          logoType={logo.logoType}
                          logoKey={logo.logoKey}
                          customStyle={logo.customStyle}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-medium text-gray-900">
                              #{logo.displayOrder}. {logo.title}
                            </h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              {logo.logoType}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {logo.site}
                            </span>
                            <code className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                              {logo.logoKey}
                            </code>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(logo)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(logo._id)}
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
