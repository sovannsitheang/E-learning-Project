"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getAuthUser, setAuthHydrated, subscribeAuth } from "@/lib/auth";
import type { AuthUser } from "@/lib/api/auth";

export function useAuthUser(): AuthUser | null {
  const user = useSyncExternalStore<AuthUser | null>(
    subscribeAuth,
    getAuthUser,
    () => null,
  );

  useEffect(() => {
    setAuthHydrated();
  }, []);

  return user;
}
