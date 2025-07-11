"use server";

import { db } from "@/db";
import { postTag, tag } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTagsByPostId(postId: string) {
  return await db
    .select()
    .from(tag)
    .innerJoin(postTag, eq(postTag.tagId, tag.id))
    .where(eq(postTag.postId, postId));
}
