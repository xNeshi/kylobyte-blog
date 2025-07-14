import BlogContents from "@/components/BlogContents";
import CommentSection from "@/components/CommentSection";
import NotExist from "@/components/NotExist";
import PostCard from "@/components/PostCard";
import { fetchPostsBySlugWithId, fetchRecentPosts } from "@/lib/actions/posts";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{
    slugWithId: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post) return notFound();

  return {
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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);
  const recentPosts = await fetchRecentPosts(5);

  if (!post) {
    return <NotExist>Post not found.</NotExist>;
  }

  return (
    <section className="flex items-start w-full p-6 min-[1280px]:px-0 gap-10">
      {recentPosts != null && recentPosts.length > 0 ? (
        <aside className="hidden tablet:flex flex-col flex-[25%] w-full h-full">
          <h3 className="text-[22px] mb-6 font-semibold">Recent blog posts</h3>
          <div className="w-full grid tablet:grid grid-cols-1 gap-y-9 gap-x-5 mb-9">
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </aside>
      ) : (
        <p className="text-gray-500 flex items-start justify-baseline">
          No recent posts available.
        </p>
      )}
      <div className="flex flex-col gap-6 flex-[75%]">
        <BlogContents post={post} />
        <hr className="my-2 opacity-20" />
        <CommentSection post={post} />
      </div>
    </section>
  );
}
