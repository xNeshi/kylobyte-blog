"use server";

import { db } from "@/db";
import { posts, postTag, tag } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { slugify } from "../utils";
import { BlogPostFormValues } from "../validations";

export async function getAllPost() {
  return await db.select().from(posts);
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

export async function createPosts(params: BlogPostFormValues) {
  return await db.transaction(async (tx) => {
    try {
      const tagResults = await Promise.all(
        params.tags.map(async (tagName) => {
          return await tx
            .insert(tag)
            .values({ name: tagName })
            .onConflictDoUpdate({
              target: tag.name,
              set: { name: tagName },
            })
            .returning()
            .then((res) => res[0]);
        })
      );

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

      await tx
        .update(posts)
        .set({ slug: slugify(post.title) + `-${post.id.slice(0, 8)}` })
        .where(eq(posts.id, post.id));

      if (tagResults.length > 0) {
        await tx
          .insert(postTag)
          .values(
            tagResults.map((tag) => ({
              postId: post.id,
              tagId: tag.id,
            }))
          )
          .onConflictDoNothing();
      }

      return post;
    } catch (error) {
      tx.rollback();
      throw error;
    }
  });
}
