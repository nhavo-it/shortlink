"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image"

type Link = {
  id: number               // vì serial → number
  slug: string             // unique short slug
  url: string              // full URL gốc
  title?: string | null    // optional
  owner_id: string         // user id từ Supabase
  created_at: Date         // timestamp
  clicks: number           // đếm số lần click
}

export default function LinkList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setLinks([]);
        setLoading(false);
        return;
      }
      const res = await fetch("/api/links/me", { headers: { Authorization: `Bearer ${token}` } });
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

  if (loading) return <div>Đang tải...</div>;
  if (!links.length) return <div>Chưa có liên kết nào (hãy đăng nhập và tạo mới).</div>;

  return (
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.id} className="rounded-lg border border-foreground/15 bg-background p-4 shadow-sm">
          <div className="font-medium">{l.title ?? "(không tiêu đề)"}</div>
          <div className="text-sm text-foreground/80">
            Liên kết rút gọn: {" "}
            <a className="underline underline-offset-4 hover:text-blue-600" href={`/${l.slug}`} target="_blank" rel="noreferrer">
              {typeof window !== 'undefined' ? window.location.origin : ''}/{l.slug}
            </a>
          </div>
          <div className="text-sm text-foreground/80">
            Liên kết gốc: {" "}
            <a className="underline underline-offset-4 hover:text-blue-600 break-all" href={l.url} target="_blank" rel="noreferrer">{l.url}</a>
          </div>
          <div className="mt-1 text-xs text-foreground/70">Lượt xem: {l.clicks}</div>
          {/* Optionally show a small QR (generate client-side) */}
          <div className="mt-3">
            <Image className="h-24 w-24 object-contain" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent((typeof window !== 'undefined' ? window.location.origin : '') + "/" + l.slug)}`} alt="qr" width={96} height={96} />
          </div>
        </li>
      ))}
    </ul>
  );
}
