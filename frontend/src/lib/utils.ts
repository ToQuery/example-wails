import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


export const formatHtml = (html: string): string => {
  return html.replace(/(\r\n|\n|\r)/g, '<br />');
};

export function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000_000) {
    return (bytes / 1_000_000_000).toFixed(2) + ' GB';
  }
  if (bytes >= 1_000_000) {
    return (bytes / 1_000_000).toFixed(2) + ' MB';
  }
  return (bytes / 1_000).toFixed(2) + ' KB';
}
