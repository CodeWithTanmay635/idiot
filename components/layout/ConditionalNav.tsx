"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function ConditionalNav() {
  const pathname = usePathname();
  // Hide the global nav on the home page — it has its own cinematic header
  if (pathname === "/") return null;
  return <Navigation />;
}
