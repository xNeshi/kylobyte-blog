import { SelectPost } from "@/db/schema";
import { SearchX } from "lucide-react";
import PostCard from "./PostCard";

type PostListProps = {
  posts: SelectPost[];
  search?: string;
};

export const PostList = ({ posts, search }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center px-10 py-20 pb-30  justify-center max-w-[300px] tablet:max-w-[400px]">
        <SearchX className="h-40 w-40 tablet:h-50 tablet:w-50 text-gray-500" />

        <p className="text-[20px] text-center text-gray-500 tablet:text-[30px] ">
          No search found for <br />
          <strong>"{search}"</strong>.
        </p>
      </div>
    );
  }
  return (
    <div className={`post-list`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostList;
