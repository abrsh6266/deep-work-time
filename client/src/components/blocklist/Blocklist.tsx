"use client";

import { Globe, Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useBlockList } from "@/hooks/useBlocklist";

export default function BlockList() {
  const { sites, isLoading, toggleSite, deleteSite } = useBlockList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="text-center py-12">
        <Globe className="w-12 h-12 text-gray-700 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">
          No blocked sites yet. Add distracting websites above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sites.map((site) => (
        <div
          key={site.id}
          className={clsx(
            "flex items-center gap-4 bg-gray-900 border rounded-xl px-4 py-3 transition-all",
            site.isActive ? "border-red-500/20" : "border-gray-800 opacity-50",
          )}
        >
          <Globe
            className={clsx(
              "w-4 h-4 shrink-0",
              site.isActive ? "text-red-500" : "text-gray-600",
            )}
          />
          <span
            className={clsx(
              "flex-1 text-sm",
              site.isActive ? "text-white" : "text-gray-500",
            )}
          >
            {site.domain}
          </span>

          <button
            onClick={() => toggleSite(site.id)}
            className="text-gray-400 hover:text-white transition-colors"
            title={site.isActive ? "Disable" : "Enable"}
          >
            {site.isActive ? (
              <ToggleRight className="w-6 h-6 text-red-500" />
            ) : (
              <ToggleLeft className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => deleteSite(site.id)}
            className="text-gray-600 hover:text-red-400 transition-colors"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
