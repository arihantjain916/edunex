"use client";
import { usePathname } from "next/navigation";

export function CheckCurrentPath(checkPath: string) {
  const pathname = usePathname();

  return pathname === checkPath;
}
