import { SelectPost } from "@/db/schema";
import { fetchTagsByPostId } from "@/lib/actions/tag";
import Link from "next/link";
import PostImageHandler from "./PostImageHandler";
import PostTagList from "./PostTagList";

type PostCardProps = {
  pos?: number;
  post: SelectPost;
  recent?: boolean;
  featured?: boolean;
};

export const PostCard = async ({
  pos,
  post,
  recent = false,
  featured = false,
}: PostCardProps) => {
  const postTags = await fetchTagsByPostId(post.id);
  const tagNames = postTags.map((tag) => tag.tag.name);

  return (
    <Link
      href={`/blogs/${post.slug}-${post.id.slice(0, 8)}`}
      className={`${
        recent
          ? `${
              featured
                ? `${
                    pos === 0
                      ? "post-card laptop:row-span-2 tablet:mb-3"
                      : pos === 3
                      ? "post-card laptop:col-span-2 laptop:flex-row laptop:mt-5"
                      : "post-card"
                  }`
                : "post-card h-fit tablet:flex-row"
            }`
          : "post-card"
      }`}
    >
      <div
        className={`relative overflow-hidden${
          featured
            ? `${
                pos === 0
                  ? `w-full aspect-[9/6] laptop:h-full tablet:aspect-[9/3]`
                  : `${
                      pos === 3
                        ? "w-full aspect-[9/6] flex-[50%] tablet:aspect-[9/3] laptop:aspect:[9/4]"
                        : "w-full aspect-[9/6] flex-[45%] tablet:aspect-[9/3]"
                    }`
              }`
            : "w-full aspect-[9/6] flex-[45%]"
        }`}
      >
        <PostImageHandler
          imageUrl={post.imageUrl}
          title={post.title}
        />
      </div>
      <div
        className={`${
          featured
            ? `${
                pos === 0
                  ? "flex flex-col items-start gap-5"
                  : `${
                      pos === 3
                        ? "flex flex-[50%] flex-col items-start gap-5"
                        : "flex flex-[55%] flex-col items-start gap-5"
                    }`
              }`
            : "flex flex-[55%] flex-col items-start gap-5"
        }`}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] text-[var(--date-foreground)] font-semibold">
            {post.createdAt?.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <h1 className="text-[23px] line-clamp-1 font-semibold">
            {post.title}
          </h1>
          <p
            className={`${
              pos === 1 || pos === 2
                ? "text-[15px] text-[var(--muted-foreground)] line-clamp-3 laptop:line-clamp-2"
                : "text-[15px] text-[var(--muted-foreground)] line-clamp-3"
            }`}
          >
            {post.description
              .replace(/<[^>]+>/g, "")
              .replace(/\n/g, " ")
              .trim()
              .substring(0, 150) + "..."}
          </p>
        </div>

        <PostTagList tags={tagNames} />
      </div>
    </Link>
  );
};

export default PostCard;
