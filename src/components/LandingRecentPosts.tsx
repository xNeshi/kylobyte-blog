import { fetchRecentPosts } from "@/lib/actions/posts";
import PostCard from "./PostCard";

export const LandingRecentPosts = async () => {
  const recentPosts = await fetchRecentPosts();

  return (
    <>
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
    </>
  );
};

export default LandingRecentPosts;
