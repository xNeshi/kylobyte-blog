"use server";

import { UTApi } from "uploadthing/server";
import z from "zod";
import {
  createPosts,
  deletePost,
  getAllPost,
  getAllPostByDesc,
  getFeaturedPosts,
  getImageUrlByPostId,
  getPostById,
  getPostsByLikeId,
  getPostsBySearchAndPage,
  getRecentPosts,
  updatePost,
} from "../queries/posts";
import {
  extractIdFromSlugWithId,
  extractSlugFromSlugWithId,
  formatErrors,
  isValidImageUrl,
} from "../utils";
import {
  createBlogPostSchema,
  deleteBlogPostSchema,
  updateBlogPostSchema,
} from "../validations";

export async function fetchAllPosts() {
  try {
    const res = await getAllPost();
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchAllPostsByDesc() {
  try {
    const res = await getAllPostByDesc();
    return res;
  } catch (error) {
    console.error("Error fetching posts by descending order:", error);
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

export async function fetchPostsBySearchAndPage(search: string, page: number) {
  try {
    const res = await getPostsBySearchAndPage(search, page);
    return res;
  } catch (error) {
    console.error("Error fetching posts by search and page:", error);
    return { posts: [], total: 0, perPage: 0 };
  }
}

export async function createBlogPost(prevState: unknown, formData: FormData) {
  const file = formData.get("file") as File | null;
  const utapi = new UTApi();

  const formValues = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    description: formData.get("description") as string,
    tags: JSON.parse(formData.get("tags") as string),
    featured:
      formData.get("featured") === "true" || formData.get("featured") === "on",
    file,
  };

  try {
    await createBlogPostSchema.parseAsync(formValues);

    let imageUrl = "";
    if (file) {
      const uploadResponse = await utapi.uploadFiles(file);

      if (!uploadResponse.data?.ufsUrl) {
        throw new Error("Image upload failed");
      }
      imageUrl = uploadResponse.data.ufsUrl;
    }

    const post = await createPosts({
      ...formValues,
      imageUrl,
    });

    return {
      status: "SUCCESS",
      post,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
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
        error: "An unexpected error occurred",
        fieldErrors: {},
        fieldData: formValues,
      };
    }
  }
}

export async function updateBlogPost(prevState: unknown, formData: FormData) {
  const postId = formData.get("postId") as string;
  const utapi = new UTApi();

  const formValues = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    description: formData.get("description") as string,
    tags: JSON.parse(formData.get("tags") as string),
    featured:
      formData.get("featured") === "true" || formData.get("featured") === "on",
  };

  try {
    await updateBlogPostSchema.omit({ file: true }).parseAsync(formValues);

    const file = formData.get("file");
    let imageUrl: string | undefined = undefined;
    const currentPost = await getImageUrlByPostId(postId);

    if (file instanceof File && file.size > 0) {
      if (currentPost?.imageUrl) {
        const oldImageKey = currentPost.imageUrl.split("/").pop();
        if (oldImageKey)
          await utapi.deleteFiles(oldImageKey).catch(console.error);
      }

      const uploadResponse = await utapi.uploadFiles(file);
      imageUrl = uploadResponse.data?.ufsUrl;
      if (!imageUrl) throw new Error("Image upload failed");
    } else {
      imageUrl = currentPost?.imageUrl;
    }

    const updatedPost = await updatePost(postId, {
      ...formValues,
      imageUrl,
    });

    return {
      status: "SUCCESS",
      post: updatedPost,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error);
      const fieldErrors = error.flatten().fieldErrors;
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
        error: "An unexpected error occurred",
        fieldErrors: {},
        fieldData: formValues,
      };
    }
  }
}

export async function deleteBlogPost(prevState: unknown, formData: FormData) {
  const postId = formData.get("postId") as string;
  const utapi = new UTApi();

  const formValues = {
    slug: formData.get("slug") as string,
    delSecretKey: formData.get("delSecretKey") as string,
  };

  try {
    await deleteBlogPostSchema.parseAsync(formValues);

    const post = await fetchPostById(postId);
    if (formValues.delSecretKey !== process.env.DELETE_SECRET_KEY) {
      throw new Error("Invalid secret key");
    } else if (formValues.slug !== post?.slug) {
      throw new Error("Invalid blog post slug");
    }

    const image = await getImageUrlByPostId(postId);
    if (image && isValidImageUrl(image.imageUrl)) {
      const imageKey = image.imageUrl.split("/").pop();
      if (imageKey) {
        await utapi.deleteFiles(imageKey).catch(console.error);
      }
    }

    await deletePost(postId);

    return {
      status: "SUCCESS",
      fieldData: {
        slug: "",
        secret: "",
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error);
      const fieldErrors = error.flatten().fieldErrors;
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
        error: "An unexpected error occurred",
        fieldErrors: {
          invalid: "Invalid blog post slug or secret key, please try again.",
        },
        fieldData: formValues,
      };
    }
  }
}
