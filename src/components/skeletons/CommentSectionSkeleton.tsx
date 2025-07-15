import { Skeleton } from "../ui/skeleton";

export const CommentSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-full h-full aspect-[10/1] 4" />
      <Skeleton className="h-10 w-full mb-5" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="flex flex-row gap-3 w-full"
          key={index}
        >
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSectionSkeleton;
