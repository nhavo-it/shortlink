import { useState } from "react";

export default function WifiForm({ setValue }: { setValue: (val: string) => void }) {
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [hidden, setHidden] = useState(false);
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");

  const updateValue = (s: string, p: string, h: boolean, e: string) => {
    // Chuẩn WiFi string theo định dạng QR
    const wifiString = `WIFI:T:${e};S:${s};P:${p};H:${h};`;
    setValue(wifiString);
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      {/* SSID */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Tên</label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => {
            setSsid(e.target.value);
            updateValue(e.target.value, pass, hidden, encryption);
          }}
          className="rounded border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          placeholder="Tên WiFi"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Mật khẩu</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            updateValue(ssid, e.target.value, hidden, encryption);
          }}
          className="rounded border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          placeholder="Mật khẩu"
        />
      </div>

      {/* Encryption */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">Mã hóa</label>
        <select
          value={encryption}
          onChange={(e) => {
            const val = e.target.value as "WPA" | "WEP" | "nopass";
            setEncryption(val);
            updateValue(ssid, pass, hidden, val);
          }}
          className="rounded border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Không mật khẩu</option>
        </select>
      </div>

      {/* Hidden Network */}
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => {
            const checked = e.target.checked;
            setHidden(checked);
            updateValue(ssid, pass, checked, encryption);
          }}
          className="mr-2 !w-[10px]"
        />
        <label className="text-sm font-medium">Mạng ẩn</label>
      </div>
    </form>
  );
}
