import { ErrorResponseData } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatErrorResponse = (
  errorResponse: ErrorResponseData,
): string => {
  if (!errorResponse.error.issues || errorResponse.error.issues.length === 0) {
    return errorResponse.error.message;
  }

  return errorResponse.error.issues
    .map((issue) => {
      const path = issue.path ? issue.path.join(".") : "Unknown path";
      const message = issue.message || "No message provided";
      return `${path}: ${message}`;
    })
    .join("; ");
};
