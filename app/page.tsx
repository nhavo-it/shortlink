"use client";
import CreateLinkForm from "@/components/CreateLinkForm";
import QRGenerator from "@/components/QRGenerator";
import { useState } from "react";
const menuItems = [
  "SHORT",
  "URL",
  "TEXT",
  "EMAIL",
  "PHONE",
  "SMS",
  "VCARD",
  "MECARD",
  "LOCATION",
  "FACEBOOK",
  "TWITTER",
  "YOUTUBE",
  "WIFI",
];

export default function Home() {
  const [active, setActive] = useState("SHORT");
  return (
    <main className="mt-10 rounded-md bg-white shadow-md">
      <nav className="flex flex-wrap items-center gap-4 bg-purple-900 text-white">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`px-3 py-1 font-bold ${
              active === item ? "bg-gray-100 text-purple-900" : "text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 space-y-6 bg-gray-100 p-5 rounded-tl-md rounded-bl-md">
          <CreateLinkForm />
        </div>
        <div className="w-full lg:w-[420px] p-10">
          <QRGenerator />
        </div>
      </div>
    </main>
  );
}
