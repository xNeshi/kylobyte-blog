"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PostTag from "./PostTag";
import { Badge } from "./ui/badge";

type PostTagListProps = {
  tags: string[];
  maxVisible?: number;
  className?: string;
};

const PostTagList = ({ tags, maxVisible = 3, className }: PostTagListProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hiddenTagsCount = tags.length - maxVisible;
  const hiddenTags = tags.slice(maxVisible);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Visible tags */}
      {tags.slice(0, maxVisible).map((tag) => (
        <PostTag
          key={tag}
          label={tag}
        />
      ))}

      {/* Overflow indicator */}
      {hiddenTagsCount > 0 && (
        <TooltipProvider delayDuration={100}>
          <Tooltip open={isHovered}>
            <TooltipTrigger asChild>
              <Badge
                className="cursor-default rounded-full shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                +{hiddenTagsCount}
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              className="w-auto p-2"
              side="right"
              align="end"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex flex-wrap gap-2 bg-[var(--accent-background)] rounded-xl p-2">
                {hiddenTags.map((tag) => (
                  <PostTag
                    key={tag}
                    label={tag}
                  />
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default PostTagList;
