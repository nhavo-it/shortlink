import { useState } from "react";

export default function SmsForm({ setValue }: { setValue: (val: string) => void }) {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const updateValue = (p: string, m: string) => {
    const smsString = `SMSTO:${p}:${m}`;
    setValue(smsString);
  };

  return (
    <form className="space-y-3">
      <input
        type="tel"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          updateValue(e.target.value, msg);
        }}
      />
      <textarea
        placeholder="Tin nhắn"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
          updateValue(phone, e.target.value);
        }}
      />
    </form>
  );
}
