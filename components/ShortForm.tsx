"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ShortForm({ setValue }: { setValue: (val: string) => void }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Đang tạo...");
    setShortUrl(null);

    // get session
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
      const result = await res.json();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const generatedUrl = `${origin}/${result.slug}`;

      setStatus("Tạo thành công");
      setUrl("");
      setTitle("");
      setShortUrl(generatedUrl);
      setValue(generatedUrl);
    } else {
      const err = await res.json();
      setStatus("Lỗi " + (err?.error ?? "không xác định"));
    }
  }

  async function copyToClipboard() {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <form onSubmit={handleCreate} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="https://lnk.bzo.vn"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
        <input
          placeholder="Tiêu đề (không bắt buộc)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tạo liên kết rút gọn
        </button>
        <div className="text-xs text-foreground/70">{status}</div>
      </div>

      {shortUrl && (
        <div className="flex items-center gap-2 mt-3">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex-1 border rounded px-2 py-1 bg-gray-50"
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded bg-green-600 px-3 py-1 text-white text-sm hover:bg-green-700"
          >
            {copied ? "Đã copy" : "Copy"}
          </button>
        </div>
      )}
    </form>
  );
}
