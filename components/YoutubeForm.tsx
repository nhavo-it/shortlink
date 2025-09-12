import { useState } from "react";

export default function YoutubeForm({ setValue }: { setValue: (val: string) => void }) {
  const [url, setUrl] = useState("");

  const handleChange = (value: string) => {
    setUrl(value);
    setValue(value); // Truyền URL cho QRGenerator
  };

  return (
    <form className="space-y-3">
      <input
        type="url"
        placeholder="Link YouTube (https://youtube.com/...)"
        className="input"
        value={url}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
}
