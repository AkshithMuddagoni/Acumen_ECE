/**
 * Utility function to combine classnames conditionally
 * Simple implementation for combining Tailwind classes
 */
export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}
