"use client";
import ShortForm from "@/components/ShortForm";
import UrlForm from "@/components/UrlForm";
import TextForm from "@/components/TextForm";
import WifiForm from "@/components/WifiForm";
import EmailForm from "@/components/EmailForm";
import PhoneForm from "@/components/PhoneForm";
import SmsForm from "@/components/SmsForm";
import MeCardForm from "@/components/MeCardForm";
import FacebookForm from "@/components/FacebookForm";
import TwitterForm from "@/components/TwitterForm";
import YoutubeForm from "@/components/YoutubeForm";
import AppStoreForm from "@/components/AppStoreForm";
import QRGenerator from "@/components/QRGenerator";
import { useState } from "react";
const menuItems = [
  "SHORT",
  "URL",
  "TEXT",
  "WIFI",
  "EMAIL",
  "PHONE",
  "SMS",
  "MECARD",
  "FACEBOOK",
  "TWITTER",
  "YOUTUBE",
  "APP STORE",
];

export default function Home() {
  const [active, setActive] = useState("SHORT");
  const [qrValue, setQrValue] = useState("");

  const renderForm = () => {
    switch (active) {
      case "SHORT":
        return <ShortForm setValue={setQrValue} />;
      case "URL":
        return <UrlForm setValue={setQrValue} />;
      case "TEXT":
        return <TextForm setValue={setQrValue} />;
      case "WIFI":
        return <WifiForm setValue={setQrValue} />;
      case "EMAIL":
        return <EmailForm setValue={setQrValue} />;
      case "PHONE":
        return <PhoneForm setValue={setQrValue} />;
      case "SMS":
        return <SmsForm setValue={setQrValue} />;
      case "MECARD":
        return <MeCardForm setValue={setQrValue} />;
      case "FACEBOOK":
        return <FacebookForm setValue={setQrValue} />;
      case "TWITTER":
        return <TwitterForm setValue={setQrValue} />;
      case "YOUTUBE":
        return <YoutubeForm setValue={setQrValue} />;
      case "APP STORE":
        return <AppStoreForm setValue={setQrValue} />;
      default:
        return <ShortForm setValue={setQrValue} />;
    }
  };

  return (
    <main className="mt-10 rounded-md bg-white shadow-md">
      <nav className="flex flex-nowrap items-center gap-4 bg-background text-white overflow-x-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`px-3 py-1 font-bold shrink-0 ${
              active === item ? "bg-gray-100 text-background" : "text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 space-y-6 bg-gray-100 p-5 rounded-tl-md rounded-bl-md">
          {renderForm()}
        </div>
        <div className="w-full lg:w-[420px] p-10">
          <QRGenerator value={qrValue} />
        </div>
      </div>
    </main>
  );
}
