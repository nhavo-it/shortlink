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
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={phone}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
}
