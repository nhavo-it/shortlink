import { useState } from "react";

export default function UrlForm({
  setValue,
}: {
  setValue: (val: string) => void;
}) {
  const [url, setUrl] = useState("");
  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="https://example.com"
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
