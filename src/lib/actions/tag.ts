"use server";

import { getAllTags, getTagsByPostId } from "../queries/tag";

export async function fetchTagsByPostId(postId: string) {
  try {
    const res = await getTagsByPostId(postId);
    return res;
  } catch (error) {
    console.error("Error fetching tags by post ID:", error);
    return [];
  }
}

export async function fetchAllTags() {
  try {
    const res = await getAllTags();
    return res;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return [];
  }
}
