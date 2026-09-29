import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes cleanly, resolving conflicts via tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency or integer amounts with clean commas.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}
