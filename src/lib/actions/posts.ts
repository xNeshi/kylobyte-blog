"use server";

import {
  getAllPost,
  getFeaturedPosts,
  getPostById,
  getRecentPosts,
} from "../queries/posts";

export async function fetchAllPosts() {
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

export async function fetchFeaturedPosts(limit: number = 3) {
  try {
    const res = await getFeaturedPosts(limit);
    return res;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}
