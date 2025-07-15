import BlogContents from "@/components/BlogContents";
import BlogSectionRecentPosts from "@/components/BlogSectionRecentPosts";
import CommentSection from "@/components/CommentSection";
import BlogContentsSkeleton from "@/components/skeletons/BlogContentsSkeleton";
import BlogSectionRecentSkeleton from "@/components/skeletons/BlogSectionRecentSkeleton";
import CommentSectionSkeleton from "@/components/skeletons/CommentSectionSkeleton";
import { fetchPostsBySlugWithId } from "@/lib/actions/posts";
import { Suspense } from "react";

export const experimental_ppr = true;

type BlogPostPageProps = {
  params: Promise<{
    slugWithId: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post) {
    return null;
  }

  return {
    metadataBase: new URL("https://localhost:3000"),
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.imageUrl,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <section className="flex items-start w-full p-6 min-[1280px]:px-0 gap-10">
      <aside className="hidden tablet:flex flex-col flex-[25%] w-full h-full">
        <h3 className="text-[22px] mb-6 font-semibold">Recent blog posts</h3>
        <Suspense fallback={<BlogSectionRecentSkeleton />}>
          <BlogSectionRecentPosts />
        </Suspense>
      </aside>
      <div className="flex flex-col gap-6 flex-[75%]">
        <Suspense fallback={<BlogContentsSkeleton />}>
          <BlogContents params={params} />
        </Suspense>
        <hr className="my-2 opacity-20" />
        <h3 className="text-[24px] font-semibold">Leave a Comment</h3>
        <Suspense fallback={<CommentSectionSkeleton />}>
          <CommentSection params={params} />
        </Suspense>
      </div>
    </section>
  );
}
