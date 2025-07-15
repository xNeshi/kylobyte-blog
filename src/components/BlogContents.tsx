import { fetchPostsBySlugWithId } from "@/lib/actions/posts";
import { fetchTagsByPostId } from "@/lib/actions/tag";
import { inter } from "../../public/font";
import NotExist from "./NotExist";
import PostImageHandler from "./PostImageHandler";
import PostTag from "./PostTag";
import PostTagList from "./PostTagList";
const markdownit = require("markdown-it");
const hljs = require("highlight.js");

const md = markdownit({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang }).value
        }</code></pre>`;
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

type BlogContentsProps = {
  params: Promise<{
    slugWithId: string;
  }>;
};

export const BlogContents = async ({ params }: BlogContentsProps) => {
  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post) {
    return <NotExist>Post not found.</NotExist>;
  }

  const postTags = await fetchTagsByPostId(post.id);
  const labels = postTags.map((tag) => tag.tag.name);
  const parsedContent = md.render(post.content);

  return (
    <article className="flex flex-col justify-center gap-3 tablet:gap-2 w-full">
      <h3 className="text-[10px] lphone:text-[14px] text-[var(--date-foreground)] mt-2 font-semibold">
        {post?.createdAt?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        . Modified on{" "}
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
      <h1 className={`${inter.className} text-[35px] font-bold mb-1`}>
        {post?.title}
      </h1>
      <PostTagList
        tags={labels}
        className="laptop:hidden mb-3"
      />
      <div className="items-center hidden laptop:flex gap-2 mb-4">
        {postTags.map((tag) => (
          <PostTag
            key={tag.tag.id}
            label={tag.tag.name}
          />
        ))}
      </div>
      <div className="relative w-full aspect-[9/5] mb-3">
        <PostImageHandler
          imageUrl={post.imageUrl}
          title={post.title}
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
