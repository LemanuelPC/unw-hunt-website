import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines clsx and tailwind-merge for handling conditional class names
 * @param inputs - Any number of class names, objects, or arrays of class names
 * @returns A merged string of class names with Tailwind conflicts resolved
 *
 * Example usage:
 * cn('px-4 py-2', isActive && 'bg-blue-500', isBig ? 'text-lg' : 'text-base')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}