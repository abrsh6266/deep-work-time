"use client";
import {
  BarChart3,
  Brain,
  History,
  ListTodo,
  ShieldBan,
  Timer,
} from "lucide-react";
import { usePathname } from "next/navigation";
const navItems = [
  { href: "/", label: "timer", icon: Timer },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/history", label: "History", icon: History },
  { href: "/blocklist", label: "Block List", icon: ShieldBan },
  { href: "/stats", label: "Statistics", icon: BarChart3 },
];

export default function SideBar() {
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
          <p className="to-gray-500 text-xs">Focus Timer</p>
        </div>
      </div>
    </aside>
  );
}
