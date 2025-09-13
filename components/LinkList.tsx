"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

type Link = {
  id: number;              // vì serial → number
  slug: string;            // unique short slug
  url: string;             // full URL gốc
  title?: string | null;   // optional
  owner_id: string;        // user id từ Supabase
  created_at: Date;        // timestamp
  clicks: number;          // đếm số lần click
};

export default function LinkList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setLinks([]);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/links/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const j = await res.json();
        setLinks(j);
      } else {
        setLinks([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500); // reset sau 1.5s
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!links.length)
    return <div>Chưa có liên kết nào (hãy đăng nhập và tạo mới).</div>;

  return (
    <ul className="space-y-3">
      {links.map((l) => {
        const shortUrl = `${
          typeof window !== "undefined" ? window.location.origin : ""
        }/${l.slug}`;

        return (
          <li
            key={l.id}
            className="flex justify-between items-start rounded-lg border border-foreground/15 bg-foreground p-4 shadow-sm"
          >
            {/* Bên trái: thông tin liên kết */}
            <div className="flex-1 pr-4">
              <div className="font-medium">{l.title ?? "(Không tiêu đề)"}</div>

              <div className="text-sm mt-1">
                Liên kết rút gọn:{" "}
                <a
                  className="underline underline-offset-4 hover:text-blue-600"
                  href={`/${l.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={() => copyToClipboard(shortUrl, l.id)}
                  className="ml-2 rounded bg-blue-500 px-2 py-0.5 text-xs text-white hover:bg-blue-600"
                >
                  {copiedId === l.id ? "Đã copy" : "Copy"}
                </button>
              </div>

              <div className="text-sm mt-1 break-all">
                Liên kết gốc:{" "}
                <a
                  className="underline underline-offset-4 hover:text-blue-600"
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.url}
                </a>
              </div>

              <div className="mt-1 text-xs">Lượt xem: {l.clicks}</div>
            </div>

            {/* Bên phải: QR code */}
            <div className="flex-shrink-0">
              <Image
                className="h-24 w-24 object-contain"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  shortUrl
                )}`}
                alt="qr"
                width={96}
                height={96}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
