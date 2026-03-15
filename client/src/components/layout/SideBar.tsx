"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Timer,
  History,
  ListTodo,
  ShieldBan,
  BarChart3,
  Brain,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Timer", icon: Timer },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/history", label: "History", icon: History },
  { href: "/blocklist", label: "Block List", icon: ShieldBan },
  { href: "/stats", label: "Statistics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
      <div className="flex items-center gap-3 p-6 border-b border-gray-800">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">
            Deep Work
          </h1>
          <p className="text-gray-500 text-xs">Focus Timer</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Stay focused</p>
          <p className="text-gray-600 text-xs">
            Deep work is the ability to focus without distraction on a
            cognitively demanding task.
          </p>
        </div>
      </div>
    </aside>
  );
}
