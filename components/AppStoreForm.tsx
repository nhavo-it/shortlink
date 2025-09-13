import { useState } from "react";
export default function AppStoreForm({ setValue }: { setValue: (val: string) => void }) {
    return (
      <form className="space-y-3">
        <input
          type="url"
          placeholder="Link App Store / Google Play"
        />
      </form>
    );
  }
  