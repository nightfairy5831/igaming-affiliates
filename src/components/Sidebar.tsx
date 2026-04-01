"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon, UsersIcon, CampaignIcon, ChartIcon,
  DollarIcon, SettingsIcon, LogoutIcon, BellIcon,
} from "./Icons";

const navItems = [
  { label: "Dashboard", href: "/", icon: DashboardIcon },
  { label: "Affiliates", href: "/affiliates", icon: UsersIcon },
  { label: "Campaigns", href: "/campaigns", icon: CampaignIcon },
  { label: "Reports", href: "/reports", icon: ChartIcon },
  { label: "Financial", href: "/financial", icon: DollarIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-sidebar flex flex-col z-50">
      <div className="px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">AffiliateHub</span>
            <span className="block text-white/50 text-[10px] tracking-widest uppercase">iGaming Platform</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "sidebar-link-active" : "sidebar-link"}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4 space-y-1">
        <button className="sidebar-link w-full">
          <BellIcon className="w-5 h-5" />
          <span>Notifications</span>
          <span className="ml-auto bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </button>
        <Link href="/login" className="sidebar-link w-full">
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>

      <div className="px-4 pb-6">
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
            CM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Carlos Mendes</p>
            <p className="text-white/50 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
