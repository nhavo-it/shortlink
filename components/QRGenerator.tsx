"use client";
import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

type QRType = "URL" | "TEXT" | "WIFI";
type EncryptionType = "WPA" | "WEP" | "nopass";

export default function QRGenerator() {
  const [type, setType] = useState<QRType>("URL");
  const [payload, setPayload] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState<EncryptionType>("WPA");
  const [img, setImg] = useState<string>("");

  async function generate() {
    let data = "";
    if (type === "URL") data = payload;
    else if (type === "TEXT") data = payload;
    else if (type === "WIFI") {
      // WIFI format: WIFI:T:WPA;S:SSID;P:password;H:true;;
      const H = "false";
      data = `WIFI:T:${encryption};S:${ssid};P:${password};H:${H};;`;
    }
    try {
      const url = await QRCode.toDataURL(data, { margin: 1 });
      setImg(url);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="rounded-lg border border-foreground/15 bg-background p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-medium">QR Generator</h3>
      <div className="mb-3">
        <label className="block text-sm mb-1">Type</label>
        <select
          className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value as QRType)}
        >
          <option value="URL">URL</option>
          <option value="TEXT">Text</option>
          <option value="WIFI">WiFi</option>
        </select>
      </div>

      {type === "URL" && (
        <div className="mb-3">
          <input
            className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>
      )}

      {type === "TEXT" && (
        <div className="mb-3">
          <textarea
            className="w-full min-h-28 rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Some text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>
      )}

      {type === "WIFI" && (
        <div className="mb-3 grid gap-3">
          <input
            className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="SSID"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
          />
          <input
            className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={encryption}
            onChange={(e) => setEncryption(e.target.value as EncryptionType)}
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No password</option>
          </select>
        </div>
      )}

      <button
        onClick={generate}
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate QR
      </button>

      {img && (
        <div className="mt-4 space-y-2">
          <Image className="rounded-md border border-foreground/15" src={img} alt="qr" width={256} height={256} />
          <div>
            <a className="text-sm underline underline-offset-4 hover:text-blue-600" download="qr.png" href={img}>
              Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
    
  );
}
