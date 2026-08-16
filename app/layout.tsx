import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
export const metadata: Metadata = { title: "Idot", description: "A playful personal archive" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Navigation />{children}</body></html>; }
