"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const LatestWork = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false }); // latest first

        if (error) throw error;

        setProjects(data || []);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section>
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>Latest Works</h2>
              <p className="text-xl text-orange-500">
                ({projects?.length.toString().padStart(2, "0")})
              </p>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <p className="text-center text-gray-500">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-center text-gray-600">No projects available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 xl:gap-y-12">
                {projects.map((p, index) => (
                  <div key={p.id || index} className="group flex flex-col gap-3 xl:gap-6">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={p.image || "/placeholder.jpg"}
                        alt={p.title}
                        width={570}
                        height={414}
                        className="rounded-lg w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Link
                        href={p.project_url || ""}
                        className="absolute top-0 left-0 backdrop-blur-xs bg-primary/15 w-full h-full hidden group-hover:flex rounded-lg transition-all"
                      >
                        <span className="flex justify-center items-center p-5 w-full">
                          <svg
                            width="65"
                            height="64"
                            viewBox="0 0 65 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.333374"
                              width="64"
                              height="64"
                              rx="32"
                              fill="#FE4300"
                            />
                            <path
                              d="M25.6667 25.3333H39M39 25.3333V38.6666M39 25.3333L25.6667 38.6666"
                              stroke="#FFF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>

                    {/* Title & Client */}
                    <div className="flex flex-col gap-0 xl:gap-2">
                      <div className="flex items-center justify-between">
                        <Link href={p.slug || "#"}>
                          <h5 className="hover:text-orange-500 transition">
                            {p.title}
                          </h5>
                        </Link>
                        <Image
                          src="/images/icon/right-arrow-icon.svg"
                          alt="arrow"
                          width={30}
                          height={30}
                        />
                      </div>
                      <p className="text-gray-600 text-sm">
                        Client: {p.client || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;
