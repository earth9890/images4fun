"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { MobileNav } from "./mobile-nav";
import { ROUTES } from "@/lib/constants";
import type { ReactNode } from "react";

const TOOL_PREFIXES = [ROUTES.COMPRESS, ROUTES.CROP, ROUTES.MERGE, ROUTES.CONVERT];

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isTool = TOOL_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface)]">
      <Header currentRoute={pathname} />
      <div className="flex flex-1">{children}</div>
      {isTool && <MobileNav currentRoute={pathname} />}
      <Footer />
    </div>
  );
}
