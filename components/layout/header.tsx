import Link from "next/link";
import { navItems } from "@/lib/utils";
import HeaderLogo from "@/components/layout/header-logo";
import AuthControls from "@/components/layout/auth-controls";
import MobileNav from "@/components/layout/mobile-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <HeaderLogo />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthControls />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}