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
    immediatelyRender: false,
    editable: false,
    extensions: [StarterKit, Underline, Image],
    content: comment.content as JSONContent,
  });

  if (!editor) return null;

  return (
    <div className="flex items-start gap-3 tablet:gap-5">
      <div className="flex items-center flex-shrink-0 justify-center h-[40px] w-[40px] tablet:h-[50px] tablet:w-[50px] rounded-full bg-gray-200 dark:bg-gray-700">
        A
      </div>
      <div className="flex flex-col gap-1 ">
        <span className="inline-flex items-center gap-2 tablet:gap-3">
          <h2 className="font-bold text-[13px] tablet:text-[16px]">
            {comment.author}
          </h2>{" "}
          <h3 className="opacity-80 text-[13px] tablet:text-[15px]">
            {timeAgo}
          </h3>
        </span>
        <EditorContent
          editor={editor}
          className="text-[13px] tablet:text-[15px] "
        />
      </div>
    </div>
  );
};

export default CommentCard;
