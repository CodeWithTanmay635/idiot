"use client";
export function PageTransition({ children }: { children: React.ReactNode }) { return <div style={{animation:"fade .25s ease-out"}}>{children}</div>; }
