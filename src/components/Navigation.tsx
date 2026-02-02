"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Star } from "lucide-react";
import { routes } from "@/lib/routes";

const navigation = [
  { href: routes.home(), label: "Price Tracker", icon: TrendingUp },
  { href: routes.watchlist(), label: "Watchlist", icon: Star },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)] shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href={routes.home()} className="flex items-center">
            <span className="text-xl font-bold text-[var(--foreground)]">
              CryptoQuick
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navigation.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary-foreground)] text-[var(--primary)]"
                      : "hover:text-[var(--foreground)] hover:bg-[var(--background)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
