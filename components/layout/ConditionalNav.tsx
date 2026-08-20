"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function ConditionalNav() {
  const pathname = usePathname();
  // Hide the global nav on pages with their own full-bleed cinematic headers
  if (
    pathname === "/" ||
    pathname === "/photos" ||
    pathname === "/clips" ||
    pathname === "/love-life" ||
    pathname === "/political-affiliation"
  ) {
    return null;
  }
  return <Navigation />;
}
