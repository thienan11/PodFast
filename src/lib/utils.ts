import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format duration from seconds to hours and minutes
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

export function formatDate(raw: string) {
  try {
    const parsed = parse(raw, "yyyyMMdd", new Date());
    return format(parsed, "MMMM d, yyyy"); // e.g., "April 8, 2025"
  } catch {
    return "Invalid date";
  }
};