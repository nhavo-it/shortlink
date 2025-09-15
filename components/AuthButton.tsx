"use client";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { scopes: "email profile" },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user)
    return (
      <button
        onClick={signIn}
        className="inline-flex items-center gap-2 rounded text-background bg-foreground px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Đăng nhập
      </button>
    );
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block text-sm text-foreground">
        Chào, <span className="font-medium">Võ Văn Nhã</span>
      </div>

      <Link
        href="/my-qr"
        className="inline-flex items-center rounded border text-background border-blue-500 bg-blue-50 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Mã QR của tôi
      </Link>
      <button
        onClick={signOut}
        className="inline-flex items-center rounded border border-foreground bg-transparent px-3 py-1.5 text-sm text-foreground hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/30"
      >
        Đăng xuất
      </button>
    </div>
  );
}
