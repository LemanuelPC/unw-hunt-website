/**
 * Utility functions for date manipulation in the hunt tracking system.
 * These functions handle common date operations used throughout the application.
 */

/**
 * Calculates the next hunt time based on the current time.
 * If current time is before 5 AM, returns today at 5 AM.
 * If current time is after 5 AM, returns tomorrow at 5 AM.
 *
 * @param currentTime - The current date and time
 * @returns A new Date object set to the next hunt time
 */
export function getNextHuntTime(currentTime: Date): Date {
  const nextHunt = new Date(currentTime);

  if (nextHunt.getHours() < 5) {
    // Set to today at 5 AM
    nextHunt.setHours(5, 0, 0, 0);
  } else {
    // Set to tomorrow at 5 AM
    nextHunt.setDate(nextHunt.getDate() + 1);
    nextHunt.setHours(5, 0, 0, 0);
  }

  return nextHunt;
}

/**
 * Formats a date into a locale-specific string representation.
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (e.g., 'en', 'pt', 'es')
 * @returns A formatted string representation of the date
 */
export function formatDateTime(date: Date, locale: string = 'en'): string {
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}