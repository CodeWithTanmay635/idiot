import type { Metadata } from "next";
import "./globals.css";
import { ConditionalNav } from "@/components/layout/ConditionalNav";

export const metadata: Metadata = {
  title: "Idot — A Digital Archive",
  description: "An unofficial, overly serious investigation into one individual.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ConditionalNav />
        {children}
      </body>
    </html>
  );
}
