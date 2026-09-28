import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="G4-Learning - Home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      </span>
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-brand-800">G4-Learning</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-500 min-[380px]:flex">
            E-Learning Platform
          </span>
        </span>
    </Link>
  );
}