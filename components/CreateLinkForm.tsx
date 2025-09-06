"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateLinkForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating...");
    // get session to pass token to server API
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setStatus("Please login first.");
      return;
    }

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, title }),
    });

    if (res.ok) {
      setStatus("Created. Reloading...");
      setUrl("");
      setTitle("");
      // optionally refresh UI — simple way: reload the page
      window.location.reload();
    } else {
      const err = await res.json();
      setStatus("Error: " + (err?.error ?? "unknown"));
    }
  }

  return (
    <form onSubmit={handleCreate} className="rounded-lg border border-foreground/15 bg-background p-4 space-y-3 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create short link
        </button>
        <div className="text-xs text-foreground/70">{status}</div>
      </div>
    </form>
  );
}
