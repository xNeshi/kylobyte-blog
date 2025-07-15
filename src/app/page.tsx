import HeaderTitle from "@/components/HeaderTitle";
import LandingFeaturedPosts from "@/components/LandingFeaturedPosts";
import LandingRecentPosts from "@/components/LandingRecentPosts";
import LandingPageSkeleton from "@/components/skeletons/LandingPageSkeleton";
import PostAreaSkeleton from "@/components/skeletons/PostAreaSkeleton";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function Home() {
  return (
    <>
      <HeaderTitle />

      <section className="flex flex-col justify-center p-6 min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">Recent blog posts</h3>
        <Suspense fallback={<LandingPageSkeleton />}>
          <LandingRecentPosts />
        </Suspense>
      </section>

      <section className="flex flex-col justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">Featured blog posts</h3>
        <Suspense fallback={<PostAreaSkeleton length={3} />}>
          <LandingFeaturedPosts />
        </Suspense>
      </section>
    </>
  );
}
