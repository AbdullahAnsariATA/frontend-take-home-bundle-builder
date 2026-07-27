type ClassValue = string | false | null | undefined | 0

/** Lightweight className merger (no external dependency). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
