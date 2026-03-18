"use client";

import type { ReactNode } from "react";

interface ToolLayoutProps {
  children: ReactNode;
}

export function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[var(--color-surface)]">
      <div className="mx-auto max-w-5xl px-4 py-8 pb-20 lg:pb-8 animate-fade-in">
        {children}
      </div>
    </main>
  );
}
