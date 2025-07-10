import PostCard from "@/components/PostCard";
import PostTag from "@/components/PostTag";
import { fetchPostsBySlugWithId, fetchRecentPosts } from "@/lib/actions/posts";
import { fetchTagsByPostId } from "@/lib/actions/tag";
import Image from "next/image";
import { inter } from "../../../../public/font";

type BlogPostPageProps = {
  params: Promise<{
    slugWithId: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);
  const recentPosts = await fetchRecentPosts(5);

  if (!post)
    return <p className="text-gray-500 text-[30px] mt-20">Post not found.</p>;

  const postTags = await fetchTagsByPostId(post.id);

  return (
    <div className="flex items-start  p-6 min-[1280px]:px-0 gap-10">
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
      <article className="flex-[75%] flex flex-col justify-center gap-3 tablet:gap-2">
        <h3 className="text-[14px] text-[var(--date-foreground)] font-semibold">
          {post?.createdAt?.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          ,{" "}
          {post?.createdAt?.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h3>
        <h1 className={`${inter.className} text-[23px] font-bold`}>
          {post?.title}
        </h1>
        <div className="flex items-center gap-2 mb-3">
          {postTags.map((tag) => (
            <PostTag
              key={tag.tag.id}
              label={tag.tag.name}
            />
          ))}
        </div>
        <div className="relative w-full aspect-[9/5] mb-3">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p>{post?.content}</p>
      </article>
    </div>
  );
}
