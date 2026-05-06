"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Bell,
  Images,
  LogOut,
  Shield,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { JwtPayload } from "@/lib/auth";

const navigacija = [
  {
    label: "Контролна табла",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Образовни профили",
    href: "/admin/profili",
    icon: GraduationCap,
    exact: false,
  },
  {
    label: "Смерови",
    href: "/admin/smerovi",
    icon: BookOpen,
    exact: false,
  },
  {
    label: "Обавештења",
    href: "/admin/obavestenja",
    icon: Bell,
    exact: false,
  },
  {
    label: "Галерија",
    href: "/admin/galerija",
    icon: Images,
    exact: false,
  },
  {
    label: "Упис",
    href: "/admin/upis",
    icon: Images,
    exact: false,
  },
];

export default function AdminSidebar({ user }: { user: JwtPayload }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-60 bg-stone-950 flex flex-col shrink-0 min-h-screen">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-crimson-700 flex items-center justify-center shrink-0">
            <Shield size={17} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">
              Администрација
            </p>
            <p className="text-stone-500 text-xs mt-0.5">СШ Доситеј</p>
          </div>
        </div>
      </div>

      {/* Navigacija */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navigacija.map((item) => {
          const Icon = item.icon;
          const aktivan = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) &&
              (item.exact || pathname !== "/admin" || item.href === "/admin");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-sm group ${
                aktivan
                  ? "bg-crimson-700 text-white"
                  : "text-stone-400 hover:text-white hover:bg-stone-800"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              {aktivan && <ChevronRight size={13} />}
            </Link>
          );
        })}

        {/* Link na sajt */}
        <div className="pt-4 border-t border-stone-800 mt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-stone-500 hover:text-white hover:bg-stone-800 transition-colors rounded-sm"
          >
            <ExternalLink size={16} className="shrink-0" />
            Погледај сајт
          </a>
        </div>
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-stone-800">
        <div className="px-3 py-2 mb-1">
          <p className="text-white text-sm font-semibold leading-none">
            {user.name ?? user.email}
          </p>
          <p className="text-stone-500 text-xs mt-1">{user.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-stone-500 hover:text-red-400 hover:bg-stone-800 transition-colors w-full text-left rounded-sm"
        >
          <LogOut size={16} />
          Одјави се
        </button>
      </div>
    </aside>
  );
}
