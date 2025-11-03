// src/app/admin/add-project/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleUploadToCloudinary(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET || "");
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: form
    });
    const data = await res.json();
    return data.secure_url;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ title, client, description: desc, image: imageUrl })
    });
    if (res.ok) router.push("/admin");
    else alert("Create failed");
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    const url = await handleUploadToCloudinary(e.target.files[0]);
    setImageUrl(url);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Project</h1>
      <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2" required />
        <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client" className="w-full border p-2" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2" />
        <input type="file" onChange={onFileChange} />
        {imageUrl && <img src={imageUrl} className="w-40 h-40 object-cover rounded" />}
        <button className="bg-black text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
