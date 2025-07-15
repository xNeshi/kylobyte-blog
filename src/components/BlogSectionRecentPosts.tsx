import { fetchRecentPosts } from "@/lib/actions/posts";
import PostCard from "./PostCard";

export const BlogSectionRecentPosts = async () => {
  const recentPosts = await fetchRecentPosts(5);

  return (
    <>
      {recentPosts != null && recentPosts.length > 0 ? (
        <div className="w-full grid tablet:grid grid-cols-1 gap-y-9 gap-x-5 mb-9">
          {recentPosts.map((post) => (
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

export default BlogSectionRecentPosts;
