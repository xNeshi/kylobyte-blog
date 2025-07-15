import { fetchFeaturedPosts } from "@/lib/actions/posts";
import PostCard from "./PostCard";

export const LandingFeaturedPosts = async () => {
  const featuredPosts = await fetchFeaturedPosts();

  return (
    <>
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
    </>
  );
};

export default LandingFeaturedPosts;
