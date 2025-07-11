"use server";

import { db } from "@/db";
import { comments, InsertComment } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getCommentsByPostId(postId: string) {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));
}

export async function addComment(comment: InsertComment) {
  return await db.insert(comments).values(comment);
}
