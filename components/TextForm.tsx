import { useState } from "react";

export default function TextForm({ setValue }: { setValue: (val: string) => void }) {
  const [text, setText] = useState("");

  const handleChange = (val: string) => {
    setText(val);
    setValue(val); // trả về string cho QRGenerator
  };

  return (
    <form className="space-y-3">
      <textarea
        placeholder="Nhập nội dung văn bản..."
        rows={4}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
}
