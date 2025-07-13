"use server";

import z from "zod";

import {
  createPosts,
  getAllPost,
  getFeaturedPosts,
  getPostById,
  getPostsByLikeId,
  getRecentPosts,
} from "../queries/posts";
import {
  extractIdFromSlugWithId,
  extractSlugFromSlugWithId,
  formatErrors,
} from "../utils";
import { blogPostSchema } from "../validations";

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
  const formValues = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
    tags: JSON.parse(formData.get("tags") as string),
    featured: formData.get("featured") === "true",
  };

  try {
    await blogPostSchema.parseAsync(formValues);
    const post = await createPosts(formValues);

    return {
      status: "SUCCESS",
      post,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = z.treeifyError(error).errors;
      const formattedErrors = formatErrors(fieldErrors);
      return {
        status: "ERROR",
        error: "Error in the fields",
        fieldErrors: formattedErrors,
        fieldData: formValues,
      };
    } else {
      return {
        status: "ERROR",
        error: "User Doesn't Exist",
        fieldErrors: { credentials: "Invalid Credentials. Try Again." },
        fieldData: formValues,
      };
    }
  }
}
