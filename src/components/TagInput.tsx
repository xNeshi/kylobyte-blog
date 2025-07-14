"use client";

import { SelectTag } from "@/db/schema";
import { KeyboardEvent, useRef, useState } from "react";
import PostTag from "./PostTag";

type TagInputProps = {
  tags: SelectTag[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

export const TagInput = ({
  tags,
  selectedTags,
  setSelectedTags,
}: TagInputProps) => {
  const availableTags = tags.map((tag) => tag.name);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const MAX_TAGS = 10;

  const filteredSuggestions = availableTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  const addTag = (tag: string) => {
    if (selectedTags.length >= MAX_TAGS) return;

    const trimmedTag = tag.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags([...selectedTags, trimmedTag]);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedTags.length > 0
    ) {
      e.preventDefault();
      setSelectedTags(selectedTags.slice(0, -1));
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        ref={containerRef}
        className={`flex flex-wrap items-center gap-2 w-full border-1 rounded-full p-2 px-5 min-h-[44px] ${
          selectedTags.length > 0 ? "py-2" : ""
        }`}
        onClick={handleContainerClick}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="w-fit relative group"
          >
            <PostTag
              label={tag}
              className="pr-6"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 text-sm"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="flex-1 min-w-[100px] outline-none bg-transparent text-[15px]"
          placeholder={
            selectedTags.length === 0 ? "Add related tags for the blog" : ""
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {inputValue &&
        filteredSuggestions.length > 0 &&
        selectedTags.length < MAX_TAGS && (
          <ul className="border bg-background shadow absolute mt-13 rounded-2xl z-10 w-full mx-2 max-w-lg max-h-[200px] overflow-y-auto">
            {filteredSuggestions.map((tag) => (
              <li
                key={tag}
                className="px-3 py-2 hover:bg-[var(--hover-bg)] cursor-pointer"
                onClick={() => addTag(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
