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
      <nav className="flex items-center space-x-4 bg-purple-900 text-while p-2">
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`font-bold ${
            active === item ? "bg-while" : ""
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
