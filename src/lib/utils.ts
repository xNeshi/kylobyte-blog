import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#0ea5e9",
  "#06b6d4",
  "#10b981",
  "#22c55e",
  "#84cc16",
  "#eab308",
];

export function getColorFromText(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

export function getBackgroundColor(hex: string, weight = 0.88) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const mixed = (channel: number) =>
    Math.round((1 - weight) * channel + weight * 255);

  return `rgb(${mixed(r)}, ${mixed(g)}, ${mixed(b)})`;
}

export function extractIdFromSlugWithId(slugWithId: string): string | null {
  const parts = slugWithId.split("-");
  const maybeId = parts.at(-1);
  return maybeId?.length === 8 ? maybeId : null;
}

export function extractSlugFromSlugWithId(slugWithId: string): string {
  return slugWithId.slice(0, -9);
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export function isEditorContentEmpty(json: any): boolean {
  if (!json || json.type !== "doc" || !Array.isArray(json.content)) return true;

  return json.content.every((node: any) => {
    if (node.type !== "paragraph" || !Array.isArray(node.content)) return true;

    return node.content.every((child: any) => {
      return child.type === "text" && (!child.text || child.text.trim() === "");
    });
  });
}

export function cleanEditorContent(doc: any): any {
  if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) {
    return { type: "doc", content: [] };
  }

  const isEmptyParagraph = (node: any) => {
    if (node.type !== "paragraph" || !Array.isArray(node.content)) return true;

    return node.content.every((child: any) => {
      return child.type === "text" && (!child.text || child.text.trim() === "");
    });
  };

  const filtered = doc.content.filter((node: any) => {
    return node.type !== "paragraph" || !isEmptyParagraph(node);
  });

  let start = 0;
  let end = filtered.length;

  while (
    start < end &&
    filtered[start].type === "paragraph" &&
    isEmptyParagraph(filtered[start])
  )
    start++;
  while (
    end > start &&
    filtered[end - 1].type === "paragraph" &&
    isEmptyParagraph(filtered[end - 1])
  )
    end--;

  return {
    type: "doc",
    content: filtered.slice(start, end),
  };
}

export function formatErrors(errors: any) {
  const formattedErrors: Record<string, string> = {};
  for (const key in errors) {
    if (errors[key]) {
      formattedErrors[key] = errors[key]?.join(". ") || "";
    }
  }
  return formattedErrors;
}

export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === `https:` &&
      parsedUrl.host === `${process.env.UPLOADTHING_DOMAIN}`
    );
  } catch {
    return false;
  }
}

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
