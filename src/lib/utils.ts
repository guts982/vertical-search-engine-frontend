import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimestampToHumanReadable(timestamp: string): string {
  const date = new Date(timestamp); // Convert the timestamp string to a Date object
  
  // Format the date into a human-readable string (you can adjust the format as needed)
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Adjust if you want 24-hour format
  };

  return date.toLocaleString('en-US', options); // Adjust locale as needed
}


export function getFutureDateTime(startAt:string) {
  const input = new Date(startAt)
  const hoursAfter24 = new Date(input.getTime() + 24 * 60 * 60 * 1000); // 24 hours after
  const weekAfter = new Date(input.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week after
  const monthAfter = new Date(input.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 month after

  return {
    hoursAfter24, weekAfter, monthAfter
  }
}
export function getTimeDifferenceInSeconds(start: string, end: string): number {
  // Convert timestamp strings into Date objects
  const startDate = new Date(start.replace(" ", "T"));
  const endDate = new Date(end.replace(" ", "T"));

  // Calculate difference in seconds
  return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
}



export function secondsToHms(seconds: number): string {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format the result
  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (remainingSeconds > 0) parts.push(`${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`);

  // Join the parts into a single string
  return parts.join(' ') || '0 seconds';
}





function calculateCountdown(started_at: string) {
  // Step 1: Parse the started_at date
  const startDate = new Date(started_at);

  // Step 2: Calculate the times
  const hoursAfter24 = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours after
  const weekAfter = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week after
  const monthAfter = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 month after

  // Step 3: Function to calculate the countdown
  function getCountdown(targetDate: Date): string {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Time has passed';
    }
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
  }

  // Step 4: Return all the times and countdowns
  return {
    "24 hours later": {
      date: hoursAfter24.toLocaleString(),
      countdown: getCountdown(hoursAfter24),
    },
    "1 week later": {
      date: weekAfter.toLocaleString(),
      countdown: getCountdown(weekAfter),
    },
    "1 month later": {
      date: monthAfter.toLocaleString(),
      countdown: getCountdown(monthAfter),
    },
  };
}
