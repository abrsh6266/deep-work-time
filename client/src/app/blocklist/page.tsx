"use client";

import BlockItemForm from "@/components/blocklist/BlockItemForm";
import BlockList from "@/components/blocklist/Blocklist";
import { ShieldBan } from "lucide-react";

export default function BlocklistPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">
          Distraction Blocker
        </h2>
        <p className="text-gray-500 text-sm">
          Keep a list of distracting websites. Active during focus sessions.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <ShieldBan className="w-5 h-5 text-red-500" />
          <h3 className="text-white font-semibold">Add Site to Block</h3>
        </div>
        <BlockItemForm />
      </div>

      <BlockList />
    </div>
  );
}
