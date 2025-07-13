import { SelectPost } from "@/db/schema";
import { fetchTagsByPostId } from "@/lib/actions/tag";
import Image from "next/image";
import { inter } from "../../public/font";
import PostTag from "./PostTag";
import PostTagList from "./PostTagList";

type BlogContentsProps = {
  post: SelectPost;
};

export const BlogContents = async ({ post }: BlogContentsProps) => {
  const postTags = await fetchTagsByPostId(post.id);
  const labels = postTags.map((tag) => tag.tag.name);

  return (
    <article className="flex flex-col justify-center gap-3 tablet:gap-2">
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
      <PostTagList
        tags={labels}
        className="laptop:hidden mb-3"
      />
      <div className="items-center hidden laptop:flex gap-2 mb-3">
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
      <p>{post?.description}</p>
      <br />
      <p>{post?.content}</p>
    </article>
  );
};

export default BlogContents;
