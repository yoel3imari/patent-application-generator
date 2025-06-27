import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function shortenFilename(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return filename.length > 5 ? `${filename.slice(0, 5)}...` : filename;
  }

  const name = filename.slice(0, lastDotIndex);
  const extension = filename.slice(lastDotIndex);

  const shortName = name.length > 5 ? `${name.slice(0, 5)}...` : name;
  return `${shortName}${extension}`;
}
