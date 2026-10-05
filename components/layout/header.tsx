import HeaderLogo from "@/components/layout/header-logo";
import HeaderNav from "@/components/layout/header-nav";
import ThemeToggle from "@/components/layout/theme-toggle";
import AuthControls from "@/components/layout/auth-controls";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <HeaderLogo />
        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderNav />
          <ThemeToggle />
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
