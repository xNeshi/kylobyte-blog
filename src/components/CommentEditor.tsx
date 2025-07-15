"use client";

import { SelectPost } from "@/db/schema";
import { createComment } from "@/lib/actions/comments";
import { cleanEditorContent, isEditorContentEmpty } from "@/lib/utils";
import BoldExtension from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import ItalicExtension from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { EmojiClickData } from "emoji-picker-react";
import { Bold, Italic, Send, Smile, UnderlineIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Picker = dynamic(
  () => import("emoji-picker-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="w-[300px] h-[350px] bg-background"></div>,
  }
);

type CommentEditorProps = {
  post: SelectPost;
};

const ICON_SIZE = {
  sizePhone: "size-4",
};

export const CommentEditor = ({ post }: CommentEditorProps) => {
  const [content, setContent] = useState<JSONContent | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate picker position
  useEffect(() => {
    if (showPicker && buttonRef.current && pickerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      pickerRef.current.style.top = `${buttonRect.top - 350 - 10}px`; // 350 is picker height
      pickerRef.current.style.left = `${buttonRect.left}px`;
    }
  }, [showPicker]);

  const handleSubmit = async () => {
    if (!content || isEditorContentEmpty(content)) return;

    setSubmitting(true);
    try {
      const cleanedContent = cleanEditorContent(content);
      await createComment(post, cleanedContent);
      editor?.commands.clearContent();
      setContent(null);
    } finally {
      setSubmitting(false);
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      BoldExtension,
      ItalicExtension,
      Underline,
      Image,
      Placeholder.configure({
        placeholder: "Write a comment...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div
      className="flex flex-col border-1 rounded-2xl relative"
      ref={containerRef}
    >
      <EditorContent
        editor={editor}
        className="h-[100px] active:outline-none m-3 ml-4 mt-4 overflow-y-auto"
        onClick={() => editor?.commands.focus()}
      />
      <div className="flex items-center justify-between gap-4 text-sm w-full border-t-1 p-2 tablet:px-4">
        <div className="flex items-center justify-center gap-2 lphone:gap-4">
          <div className="flex items-center justify-center gap-2 lphone:gap-2">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`shadow-none !p-1 lphone:!p-2 ${
                editor.isActive("bold") ? "bg-[var(--hover-bg)]" : ""
              }`}
            >
              <Bold className={`${ICON_SIZE.sizePhone}`} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`shadow-none !p-1 lphone:!p-2 ${
                editor.isActive("italic") ? "bg-[var(--hover-bg)]" : ""
              }`}
            >
              <Italic className={`${ICON_SIZE.sizePhone}`} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`shadow-none !p-1 lphone:!p-2 ${
                editor.isActive("underline") ? "bg-[var(--hover-bg)]" : ""
              }`}
            >
              <UnderlineIcon className={`${ICON_SIZE.sizePhone}`} />
            </Button>
          </div>
          <span className={`text-[18px] opacity-20`}>|</span>
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center gap-2 lphone:gap-2 relative">
              <Button
                ref={buttonRef}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPicker((p) => !p);
                }}
                className="!p-1 lphone:!p-2 rounded hover:bg-muted"
              >
                <Smile className={ICON_SIZE.sizePhone} />
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!content || isEditorContentEmpty(content) || submitting}
          className="border-1 lphone:!px-5 rounded-full disabled:opacity-50 my-auto"
        >
          {submitting ? (
            "Posting..."
          ) : (
            <>
              <span className="lphone:inline hidden">Comment</span>
              <Send
                className="lphone:hidden"
                size={20}
              />
            </>
          )}
        </Button>
      </div>

      {showPicker && (
        <div
          ref={pickerRef}
          className="fixed z-[100]"
        >
          <Picker
            width={300}
            height={350}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData: EmojiClickData) => {
              editor.chain().focus().insertContent(emojiData.emoji).run();
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CommentEditor;
