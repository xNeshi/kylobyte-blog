"use server";

import { getAllPost, getPostById, getRecentPosts } from "../queries/post";

export async function fetchPosts() {
  try {
    const res = await getAllPost();
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchRecentPosts(limit: number = 4) {
  try {
    const res = await getRecentPosts(limit);
    return res;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function fetchPostById(postId: string) {
  try {
    const res = await getPostById(postId);
    return res;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return null;
  }
}
