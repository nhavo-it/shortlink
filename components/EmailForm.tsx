import { useState } from "react";

export default function EmailForm({ setValue }: { setValue: (val: string) => void }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const updateValue = (to: string, sub: string, msg: string) => {
    let str = `mailto:${to}`;
    const params: string[] = [];
    if (sub) params.push(`subject=${encodeURIComponent(sub)}`);
    if (msg) params.push(`body=${encodeURIComponent(msg)}`);
    if (params.length > 0) str += `?${params.join("&")}`;
    setValue(str);
  };

  return (
    <form className="space-y-3">
      <input
        type="email"
        placeholder="Địa chỉ email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          updateValue(e.target.value, subject, body);
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Chủ đề"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          updateValue(email, e.target.value, body);
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Nội dung email..."
        rows={4}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          updateValue(email, subject, e.target.value);
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
