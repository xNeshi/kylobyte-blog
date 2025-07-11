"use server";

import { SelectPost } from "@/db/schema";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";
import { addComment, getCommentsByPostId } from "../queries/comments";

export async function fetchCommentsByPostId(postId: string) {
  try {
    const res = await getCommentsByPostId(postId);
    return res;
  } catch (error) {
    console.error("Error fetching comments by post ID:", error);
    return [];
  }
}

export async function createComment(post: SelectPost, content: JSONContent) {
  const postId = post.id;
  const comment = { postId, content };
  const path = `blogs/${post.slug}-${postId.slice(0, 8)}`;

  try {
    const res = await addComment(comment);
    revalidatePath(path);
    return { status: "SUCESS" };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { status: "ERROR" };
  }
}
