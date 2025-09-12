import { useState } from "react";

export default function UrlForm({ setValue }: { setValue: (val: string) => void }) {
   const [url, setUrl] = useState("");
  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="https://example.com"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         value={url}
        onChange={(e) => {
          const newVal = e.target.value;
          setUrl(newVal);
          setValue(newVal); // chỉ string
        }}
      />
    </form>
  );
}
