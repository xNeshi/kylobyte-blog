import { SelectPost } from "@/db/schema";
import { fetchTagsByPostId } from "@/lib/actions/tag";
import Image from "next/image";
import { inter } from "../../public/font";
import PostTag from "./PostTag";
import PostTagList from "./PostTagList";
const markdownit = require("markdown-it");
const hljs = require("highlight.js");

const md = markdownit();

type BlogContentsProps = {
  post: SelectPost;
};

export const BlogContents = async ({ post }: BlogContentsProps) => {
  const postTags = await fetchTagsByPostId(post.id);
  const labels = postTags.map((tag) => tag.tag.name);
  const parsedContent = md.render(post.content);

  return (
    <article className="flex flex-col justify-center gap-3 tablet:gap-2 w-full">
      <h1 className={`${inter.className} text-[30px] font-bold`}>
        {post?.title}
      </h1>
      <h3 className="text-[14px] text-[var(--date-foreground)] font-semibold -mt-2 mb-2">
        {post?.createdAt?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        . Last modified on{" "}
        {post?.updatedAt?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        at{" "}
        {post?.updatedAt?.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
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
      {parsedContent && (
        <article
          className="prose prose-h1:text-3xl dark:prose-invert w-full max-w-none break-words overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      )}
    </article>
  );
};

export default BlogContents;
