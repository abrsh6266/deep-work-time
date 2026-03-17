"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useBlockList } from "@/hooks/useBlocklist";

export default function BlockItemForm() {
  const { addSite } = useBlockList();
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");
    if (!cleaned) return;
    addSite(cleaned);
    setDomain("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="e.g. twitter.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
      <button
        type="submit"
        disabled={!domain.trim()}
        className="bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Block
      </button>
    </form>
  );
}
