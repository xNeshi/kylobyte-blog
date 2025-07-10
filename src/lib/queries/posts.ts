"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

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
