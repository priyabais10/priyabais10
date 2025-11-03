"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProjectDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // 🧩 Fetch project by slug from Supabase
  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle(); // handles missing/duplicate cases gracefully

      if (error) {
        console.error("❌ Error fetching project:", error.message);
      } else if (!data) {
        console.warn("⚠️ No project found for slug:", slug);
      } else {
        setProject(data);
      }

      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  // 🧹 Loader
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading project details...
      </div>
    );
  }

  // ❌ No project found
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Project Not Found
        </h1>
        <p className="text-gray-600">
          The project you’re looking for doesn’t exist or has been removed.
        </p>
      </div>
    );
  }

  // 🧨 Delete project
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete this project?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      console.log("🗑️ Deleting project ID:", id);

      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) {
        console.error("❌ Supabase delete error:", error.message);
        alert("Failed to delete project. Check console for details.");
        return;
      }

      alert("✅ Project deleted successfully!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("🔥 Unexpected delete error:", err);
      alert("Something went wrong while deleting the project.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🖼️ Hero Section */}
      <section className="relative w-full h-[10vh] bg-gray-200 overflow-hidden" style={{padding:"45px"}}>
        <img
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-3 text-center drop-shadow-lg " >
            {project.client}
          </h1>
        </div>
      </section>

      {/* 📘 Project Info Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Title
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {project.title ||
              "This project demonstrates creative design and unique visual identity work for the client."}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Overview
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {project.description ||
              "This project demonstrates creative design and unique visual identity work for the client."}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Client
              </h3>
              <p className="text-gray-600">{project.client}</p>
            </div>

            
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all"
            >
              ← Back to Dashboard
            </button>

            <button
              onClick={() => handleDelete(project.id)}
              disabled={deleting}
              className={`text-white px-5 py-3 rounded-full font-medium transition-all ${
                deleting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {deleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>

        {/* Right Section — Preview Image */}
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Project Image</h2>
          <img
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            className="rounded-xl w-full h-[400px] object-cover"
          />
        </div>
      </section>
    </main>
  );
}
