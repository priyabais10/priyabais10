"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    image: "",
  });

  // ✅ Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle form input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add new project (auto slug from title)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Automatically generate slug from title
    let baseSlug = formData.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)+/g, "");

    let slug = baseSlug;

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("projects")
      .select("slug")
      .eq("slug", slug);

    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`; // e.g. reebok-2
    }
    const payload = { ...formData, slug };



    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setFormData({ title: "", description: "", client: "", image: "" });
      fetchProjects();
    } else {
      alert("❌ Failed to add project");
    }
  };

  // ✅ Delete project
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Add Project Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {["title", "description", "client", "image"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        ))}

        <button
          type="submit"
          className="md:col-span-2 bg-orange-500 text-white font-medium py-3 rounded-lg hover:bg-orange-600 transition-all"
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <section className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={p.image || "/placeholder.jpg"}
                  alt={p.title}
                  className="rounded-md mb-3 h-40 w-full object-cover"
                />
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{p.client}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex justify-between">
                  <a
                    href={`/work/${p.slug}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
