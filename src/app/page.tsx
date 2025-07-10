import HeaderTitle from "@/components/HeaderTitle";
import PostCard from "@/components/PostCard";
import { fetchFeaturedPosts, fetchRecentPosts } from "@/lib/actions/posts";

export default async function Home() {
  const recentPosts = await fetchRecentPosts();
  const featuredPosts = await fetchFeaturedPosts();

  console.log("Featured Posts:", featuredPosts);
  console.log("Recent Posts:", recentPosts);

  return (
    <>
      <HeaderTitle />

      <section className="flex flex-col justify-center p-6 min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">Recent blog posts</h3>

        {recentPosts != null && recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-9 gap-x-5 w-full laptop:gap-x-6 laptop:gap-y-6">
            {recentPosts.map((post, index) => (
              <PostCard
                key={post.id}
                pos={index}
                post={post}
                recent
                featured={index === 0 || index === 3}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 flex items-start justify-baseline">
            No recent posts available.
          </p>
        )}
      </section>

      <section className="flex flex-col justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">Featured blog posts</h3>
        {featuredPosts != null && featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-9 gap-x-5 mb-9">
            {featuredPosts.map((post) => (
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
