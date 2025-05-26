// pages/_app.tsx
"use client";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-(--breakpoint-md) px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
