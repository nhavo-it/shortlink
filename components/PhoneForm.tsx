import { useState } from "react";

export default function PhoneForm({ setValue }: { setValue: (val: string) => void }) {
  const [phone, setPhone] = useState("");

  const handleChange = (value: string) => {
    setPhone(value);
    setValue(`tel:${value}`);
  };

  return (
    <form className="space-y-3">
      <input
        type="tel"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
}
