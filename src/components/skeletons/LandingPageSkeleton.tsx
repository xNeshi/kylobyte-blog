import { Skeleton } from "@/components/ui/skeleton";

export const LandingPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-9 gap-x-5 mb-9">
      {/* Featured post (left side) */}
      <div className="xl:col-span-2 w-full flex flex-col space-y-4">
        <Skeleton className="w-full h-full aspect-[9/1] rounded-xl" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-5/6" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <Skeleton className="w-full h-full aspect-[9/1] rounded-xl mt-2" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-5/6" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>

      {/* Side posts (right column) */}
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col space-y-2"
          >
            <Skeleton className="w-full h-32 rounded-xl" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageSkeleton;
