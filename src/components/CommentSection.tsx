import { fetchCommentsByPostId } from "@/lib/actions/comments";
import { fetchPostsBySlugWithId } from "@/lib/actions/posts";
import { CommentCard } from "./CommentCard";
import CommentEditor from "./CommentEditor";

type CommentSectionProps = {
  params: Promise<{
    slugWithId: string;
  }>;
};

export const CommentSection = async ({ params }: CommentSectionProps) => {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post) {
    return <p className="text-gray-500">Comments not found.</p>;
  }
  const allComments = await fetchCommentsByPostId(post.id);

  return (
    <section className="flex flex-col gap-4">
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
