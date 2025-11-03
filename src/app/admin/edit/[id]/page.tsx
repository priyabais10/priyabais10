// src/app/admin/edit/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProject() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(()=> {
    if (!id) return;
    fetch(`/api/projects/${id}`).then(r=>r.json()).then(j=>{
      setProject(j);
      setTitle(j.title || "");
      setClient(j.client || "");
      setDesc(j.description || "");
      setImageUrl(j.image || "");
    });
  }, [id]);

  async function uploadToCloud(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET || "");
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { method: "POST", body: form });
    const data = await res.json();
    return data.secure_url;
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const url = await uploadToCloud(e.target.files[0]);
    setImageUrl(url);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ title, client, description: desc, image: imageUrl })
    });
    if (res.ok) router.push("/admin");
    else alert("Update failed");
  }

  if (!project) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Project</h1>
      <form onSubmit={save} className="bg-white p-6 rounded shadow space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2" required />
        <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client" className="w-full border p-2" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2" />
        <input type="file" onChange={onFileChange} />
        {imageUrl && <img src={imageUrl} className="w-40 h-40 object-cover rounded" />}
        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
