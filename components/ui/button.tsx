"use client";

import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-colors";
  const variants: Record<string, string> = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    outline:
      "border border-brand-600 text-brand-700 hover:bg-brand-100 dark:border-brand-300 dark:text-brand-300 dark:hover:bg-brand-800",
    ghost:
      "text-brand-700 hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-brand-800",
  };

  return href ? (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}