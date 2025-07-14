"use server";

import { db } from "@/db";
import { posts, postTag, tag } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { slugify } from "../utils";
import { BlogPostFormValues } from "../validations";

export async function getAllPost() {
  return await db.select().from(posts);
}

export async function getAllPostByDesc() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostById(postId: string) {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .then((post) => post[0]);
}

export async function getRecentPosts(limit: number = 4) {
  return await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export async function getFeaturedPosts(limit: number = 3) {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.isFeatured, true))
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export async function getPostsByLikeId(postId: string) {
  return await db
    .select()
    .from(posts)
    .where(sql`LEFT(${posts.id}::text, 8) = ${postId}`);
}

export async function createPosts(
  params: BlogPostFormValues & { imageUrl: string }
) {
  console.log("Creating post with params:", params);

  try {
    return await db.transaction(async (tx) => {
      try {
        const tagResults = await Promise.all(
          params.tags.map(async (tagName) => {
            const [result] = await tx
              .insert(tag)
              .values({ name: tagName })
              .onConflictDoUpdate({
                target: tag.name,
                set: { name: tagName },
              })
              .returning();
            return result;
          })
        );
        console.log("Tag results:", tagResults);

        // Ensure at least one tag was created/found
        if (!tagResults.some((tag) => tag?.id)) {
          throw new Error("At least one valid tag is required");
        }

        const [post] = await tx
          .insert(posts)
          .values({
            slug: slugify(params.title),
            title: params.title,
            content: params.content,
            description: params.description,
            imageUrl: params.imageUrl,
            isFeatured: params.featured,
          })
          .returning();
        console.log("Post created:", post);

        const updatedSlug = `${slugify(post.title)}-${String(post.id).slice(
          0,
          8
        )}`;
        await tx
          .update(posts)
          .set({ slug: updatedSlug })
          .where(eq(posts.id, post.id));

        await tx
          .insert(postTag)
          .values(
            tagResults
              .filter((tag) => tag?.id)
              .map((tag) => ({
                postId: post.id,
                tagId: tag.id,
              }))
          )
          .onConflictDoNothing();

        console.log("Post tags associated successfully");
        return post;
      } catch (innerError) {
        console.error("Transaction failed:", innerError);
        throw innerError; // Re-throw to trigger transaction rollback
      }
    });
  } catch (outerError) {
    console.error("Create post failed:", outerError);
    throw outerError;
  }
}
