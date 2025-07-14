import PostCard from "@/components/PostCard";
import { fetchAllPostsByDesc } from "@/lib/actions/posts";

export default async function BlogsPage() {
  const allPosts = await fetchAllPostsByDesc();

  return (
    <>
      <section className="flex flex-col justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">All Blogs</h3>
        {allPosts != null && allPosts.length > 0 ? (
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-9 gap-x-5 mb-9">
            {allPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 flex items-start justify-baseline">
            No recent posts available.
          </p>
        )}
      </section>
    </>
  );
}
