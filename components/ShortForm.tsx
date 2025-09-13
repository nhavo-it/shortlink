"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ShortForm({ setValue }: { setValue: (val: string) => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Đang tạo...");
    // get session to pass token to server API
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setStatus("Vui lòng đăng nhập trước.");
      return;
    }

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, title }),
    });

    if (res.ok) {
      setStatus("Tạo thành công. Đang tải lại...");
      setUrl("");
      setTitle("");
      // optionally refresh UI — simple way: reload the page
      window.location.reload();
    } else {
      const err = await res.json();
      setStatus("Lỗi: " + (err?.error ?? "không xác định"));
    }
  }

  return (
    <form onSubmit={handleCreate} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          placeholder="Tiêu đề (không bắt buộc)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tạo liên kết rút gọn
        </button>
        <div className="text-xs text-foreground/70">{status}</div>
      </div>
    </form>
  );
}
