"use client";
import AuthButton from "@/components/AuthButton";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold tracking-tight">
        <span className="hidden sm:inline">Short & QR</span>
        <span className="inline sm:hidden">S&QR</span>
      </h1>
      <AuthButton />
    </div>
  );
}
