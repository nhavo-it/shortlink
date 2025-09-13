import { useState } from "react";

export default function WifiForm({ setValue }: { setValue: (val: string) => void }) {
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [hidden, setHidden] = useState(false);

  const updateValue = (s: string, p: string, h: boolean) => {
    // Chuẩn WiFi string
    const wifiString = `WIFI:T:WPA;S:${s};P:${p};H:${h};`;
    setValue(wifiString);
  };

  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="SSID"
        value={ssid}
        onChange={(e) => {
          setSsid(e.target.value);
          updateValue(e.target.value, pass, hidden);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
          updateValue(ssid, e.target.value, hidden);
        }}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => {
            setHidden(e.target.checked);
            updateValue(ssid, pass, e.target.checked);
          }}
        />
        Hidden Network
      </label>
    </form>
  );
}
