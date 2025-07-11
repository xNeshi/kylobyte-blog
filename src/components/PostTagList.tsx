"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import PostTag from "./PostTag";
import { Badge } from "./ui/badge";

type PostTagListProps = {
  tags: string[];
  maxVisible?: number;
  className?: string;
};

const PostTagList = ({ tags, maxVisible = 3, className }: PostTagListProps) => {
  const hiddenTagsCount = tags.length - maxVisible;
  const hiddenTags = tags.slice(maxVisible);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {tags.slice(0, maxVisible).map((tag) => (
        <PostTag
          key={tag}
          label={tag}
        />
      ))}

      {hiddenTagsCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className="cursor-default rounded-full">
              +{hiddenTagsCount}
            </Badge>
          </TooltipTrigger>
          <TooltipContent
            className="w-auto p-2"
            side="bottom"
            align="center"
          >
            <div className="flex flex-wrap gap-2 bg-[#FFFFFF]  shadow-lg rounded-xl p-2">
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
