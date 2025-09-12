import { useState } from "react";

export default function FacebookForm({ setValue }: { setValue: (val: string) => void }) {
  const [link, setLink] = useState("");

  return (
    <form className="space-y-3">
      <input
        type="url"
        placeholder="Link Facebook (https://facebook.com/...)"
        value={link}
        onChange={(e) => {
          const val = e.target.value;
          setLink(val);
          setValue(val); // gửi giá trị cho QRGenerator
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
