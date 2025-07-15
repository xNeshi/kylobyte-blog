"use server";

import { db } from "@/db";
import { posts, postTag, tag } from "@/db/schema";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { slugify } from "../utils";
import { BlogPostFormValues, UpdateBlogPostFormValues } from "../validations";

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

export async function getImageUrlByPostId(postId: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.id, postId),
    columns: { imageUrl: true },
  });
}

export async function getPostsBySearchAndPage(search: string, page: number) {
  const POSTS_PER_PAGE = 6;
  const condition = search ? or(ilike(posts.title, `%${search}%`)) : undefined;

  const results = await db.query.posts.findMany({
    where: condition,
    limit: POSTS_PER_PAGE,
    offset: (page - 1) * POSTS_PER_PAGE,
  });

  const [pagesCount] = await db
    .select({
      count: sql`COUNT(*)`.mapWith(Number).as("count"),
    })
    .from(posts)
    .where(condition);

  return {
    posts: results,
    pagesCount: pagesCount.count,
    perPage: POSTS_PER_PAGE,
  };
}

export async function createPosts(
  params: BlogPostFormValues & { imageUrl: string }
) {
  return await db.transaction(async (tx) => {
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

    return post;
  });
}

export async function updatePost(
  postId: string,
  params: UpdateBlogPostFormValues & { imageUrl?: string }
) {
  return await db.transaction(async (tx) => {
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

    if (!tagResults.some((tag) => tag?.id)) {
      throw new Error("At least one valid tag is required");
    }

    const [updatedPost] = await tx
      .update(posts)
      .set({
        title: params.title,
        slug: slugify(params.title),
        content: params.content,
        description: params.description,
        imageUrl: params.imageUrl,
        isFeatured: params.featured,
      })
      .where(eq(posts.id, postId))
      .returning();

    await tx.delete(postTag).where(eq(postTag.postId, postId));

    await tx
      .insert(postTag)
      .values(
        tagResults
          .filter((tag) => tag?.id)
          .map((tag) => ({
            postId: updatedPost.id,
            tagId: tag.id,
          }))
      )
      .onConflictDoNothing();

    return updatedPost;
  });
}

export async function deletePost(postId: string) {
  return await db.delete(posts).where(eq(posts.id, postId));
}
