"use client";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { scopes: "email profile" } });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) return (
    <button
      onClick={signIn}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign in with Google
    </button>
  );
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">Hi, <span className="font-medium">{user.user_metadata?.full_name ?? user.email}</span></div>
      <button
        onClick={signOut}
        className="inline-flex items-center rounded-md border border-foreground/20 bg-transparent px-3 py-1.5 text-sm hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/30"
      >
        Sign out
      </button>
    </div>
  );
}
