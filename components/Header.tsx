"use client";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="text-3xl font-semibold tracking-tight hover:text-blue-600 transition-colors">
        <h1 className="m-0">
          <span className="hidden sm:inline">Short & QR</span>
          <span className="inline sm:hidden">S&QR</span>
        </h1>
      </Link>
      <AuthButton />
    </div>
  );
}
