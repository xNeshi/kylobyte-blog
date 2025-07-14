"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import PostTag from "./PostTag";
import { Badge } from "./ui/badge";

type PostTagListProps = {
  tags: string[];
  maxVisible?: number;
  className?: string;
  maxCharacters?: number;
};

const PostTagList = ({
  tags,
  maxVisible = 3,
  className,
  maxCharacters = 30,
}: PostTagListProps) => {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    calculateVisibleTags();
  }, [tags, maxVisible, maxCharacters]);

  const calculateVisibleTags = () => {
    let characterCount = 0;
    const newVisibleTags = [];
    const newHiddenTags = [...tags];

    // First pass - respect maxVisible count
    const initialVisible = tags.slice(0, maxVisible);

    // Second pass - check character limit
    for (let i = 0; i < initialVisible.length; i++) {
      const tag = initialVisible[i];
      if (characterCount + tag.length <= maxCharacters) {
        newVisibleTags.push(tag);
        characterCount += tag.length;
        newHiddenTags.shift();
      } else {
        break;
      }
    }

    setVisibleTags(newVisibleTags);
    setHiddenTags(newHiddenTags);
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {visibleTags.map((tag) => (
        <PostTag
          key={tag}
          label={tag}
        />
      ))}

      {hiddenTags.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className="cursor-default rounded-full">
              +{hiddenTags.length}
            </Badge>
          </TooltipTrigger>
          <TooltipContent
            className="w-auto p-2"
            side="bottom"
            align="center"
          >
            <div className="flex flex-wrap gap-2 bg-[#FFFFFF] shadow-lg rounded-xl p-2">
              {hiddenTags.map((tag) => (
                <PostTag
                  key={tag}
                  label={tag}
                />
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default PostTagList;
