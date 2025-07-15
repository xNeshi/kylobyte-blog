import { Skeleton } from "../ui/skeleton";

type PostAreaSkeletonProps = {
  length?: number;
};
export const PostAreaSkeleton = ({ length = 6 }: PostAreaSkeletonProps) => {
  return (
    <div className="post-list">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-full justify-center gap-5"
        >
          <Skeleton className="w-full h-full aspect-[9/6] flex-[45%]" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-5 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>

          <div className="flex flex-wrap gap-2 ">
            {Array.from({ length: 3 }).map((_, tagIndex) => (
              <Skeleton
                key={tagIndex}
                className="h-4 w-15"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostAreaSkeleton;
