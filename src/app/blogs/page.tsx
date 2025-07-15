import PostArea from "@/components/PostArea";
import PostAreaSkeleton from "@/components/skeletons/PostAreaSkeleton";
import { Suspense } from "react";

export const experimental_ppr = true;

type BlogsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default function BlogsPage({ searchParams }: BlogsPageProps) {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-8 font-semibold ">All Blogs</h3>
        <Suspense fallback={<PostAreaSkeleton />}>
          <PostArea searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
