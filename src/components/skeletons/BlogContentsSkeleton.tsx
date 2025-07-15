import { Skeleton } from "../ui/skeleton";

export const BlogContentsSkeleton = async () => {
  return (
    <div className="flex flex-col w-full justify-center gap-5">
      <Skeleton className="h-5 w-1/4 mt-3" />
      <Skeleton className="h-6 w-2/4" />

      <div className="flex flex-wrap gap-2 ">
        {Array.from({ length: 3 }).map((_, tagIndex) => (
          <Skeleton
            key={tagIndex}
            className="h-6 w-15"
          />
        ))}
      </div>

      <Skeleton className="w-full h-full aspect-[9/6] flex-[45%] mb-3" />
      <div className="space-y-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
};

export default BlogContentsSkeleton;
