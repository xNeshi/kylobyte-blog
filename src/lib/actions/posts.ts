"use server";

import {
  getAllPost,
  getFeaturedPosts,
  getPostById,
  getPostsByLikeId,
  getRecentPosts,
} from "../queries/posts";
import { extractIdFromSlugWithId, extractSlugFromSlugWithId } from "../utils";

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

export async function fetchPostsBySlugWithId(slugWithId: string) {
  try {
    const slug = extractSlugFromSlugWithId(slugWithId);
    const partialId = extractIdFromSlugWithId(slugWithId);

    const posts = await getPostsByLikeId(partialId || "");
    const res = posts.find((post) => post.slug === slug);

    return res;
  } catch (error) {
    console.error("Error fetching post by slug with ID:", error);
    return null;
  }
}

export async function createBlogPost(prevState: unknown, formData: FormData) {
  try {
    console.log("Creating blog post with formData:", formData);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return prevState;
  }
}
