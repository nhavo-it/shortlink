import { useState } from "react";

export default function TwitterForm({ setValue }: { setValue: (val: string) => void }) {
  const [url, setUrl] = useState("");

  const handleChange = (value: string) => {
    setUrl(value);
    setValue(value); // truyền link Twitter trực tiếp
  };

  return (
    <form className="space-y-3">
      <input
        type="url"
        placeholder="Link Twitter (https://twitter.com/...)"
        className="input"
        value={url}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
}
