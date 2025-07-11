import { SelectPost } from "@/db/schema";
import { fetchCommentsByPostId } from "@/lib/actions/comments";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./CommentEditor";

type CommentSectionProps = {
  post: SelectPost;
};

export const CommentSection = async ({ post }: CommentSectionProps) => {
  const allComments = await fetchCommentsByPostId(post.id);

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-[24px] font-semibold">Leave a Comment</h3>
      <CommentEditor post={post} />
      <h3 className="text-[22px] mt-4 font-semibold">Comments:</h3>
      <div className="flex flex-col gap-8">
        {allComments.length > 0 ? (
          allComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
            />
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
