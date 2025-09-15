"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

type Link = {
  id: number;          // serial → number
  slug: string;        // short slug
  url: string;         // full URL gốc
  title?: string | null;
  owner_id: string;    // user id Supabase
  created_at: Date;    // timestamp
  clicks: number;      // lượt click
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

  // Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent mx-auto mb-3" />
          <p className="text-white">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!links.length) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v8m10 4H9a2 2 0 01-2-2v-2h10v2a2 2 0 01-2 2z"
            />
          </svg>
          <p className="font-medium">Chưa có liên kết nào</p>
          <p className="text-sm text-gray-500">
            Hãy đăng nhập và tạo mới để bắt đầu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {links.map((l) => {
        const shortUrl = `${
          typeof window !== "undefined" ? window.location.origin : ""
        }/${l.slug}`;

        return (
          <li
            key={l.id}
            className="flex flex-col md:flex-row md:justify-between md:items-start rounded-lg border border-foreground/15 bg-foreground p-4 shadow-sm"
          >
            {/* QR code (trên mobile: hiển thị trên, desktop: bên phải) */}
            <div className="flex-shrink-0 mb-3 md:mb-0 md:order-last">
              <Image
                className="h-24 w-24 object-contain mx-auto md:mx-0"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  shortUrl
                )}`}
                alt="qr"
                width={96}
                height={96}
              />
            </div>

            {/* Thông tin liên kết */}
            <div className="flex-1 md:pr-4">
              <div className="font-medium">{l.title?.trim() || "(Không tiêu đề)"}</div>

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

              <div className="mt-1 text-xs text-gray-500">
                Lượt xem: {l.clicks}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
