"use client";

import { SelectComment } from "@/db/schema";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { formatDistanceToNow } from "date-fns";

type CommentCardProps = {
  comment: SelectComment;
};

export const CommentCard = ({ comment }: CommentCardProps) => {
  const timeAgo = formatDistanceToNow(comment.createdAt!, { addSuffix: true });

  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Underline, Image],
    content: comment.content as JSONContent,
  });

  if (!editor) return null;

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-gray-200 dark:bg-gray-700">
        A
      </div>
      <div className="flex flex-col gap-1 ">
        <span className="inline-flex items-center gap-3">
          <h2 className="font-bold text-[15px]">{comment.author}</h2>{" "}
          <h3 className="opacity-80 text-[14px]">{timeAgo}</h3>
        </span>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default CommentCard;
