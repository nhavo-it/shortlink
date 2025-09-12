import { useState } from "react";

export default function MeCardForm({ setValue }: { setValue: (val: string) => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    website: "",
  });

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);

    // Build MECARD string
    const mecard = `MECARD:${updated.name ? `N:${updated.name};` : ""}${
      updated.phone ? `TEL:${updated.phone};` : ""
    }${updated.email ? `EMAIL:${updated.email};` : ""}${
      updated.address ? `ADR:${updated.address};` : ""
    }${updated.website ? `URL:${updated.website};` : ""};`;

    setValue(mecard);
  };

  return (
    <form className="space-y-3">
      <input
        type="text"
        placeholder="Họ và tên"
        className="input"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        type="tel"
        placeholder="Số điện thoại"
        className="input"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <input
        type="text"
        placeholder="Địa chỉ"
        className="input"
        value={form.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <input
        type="url"
        placeholder="Website"
        className="input"
        value={form.website}
        onChange={(e) => handleChange("website", e.target.value)}
      />
    </form>
  );
}
