import BlogEditForm from "@/components/BlogEditForm";
import { fetchPostsBySlugWithId } from "@/lib/actions/posts";
import { fetchAllTags, fetchTagsByPostId } from "@/lib/actions/tag";

type EditBlogPageProps = {
  params: Promise<{
    slugWithId: string;
  }>;
  searchParams: Promise<{
    secretKey?: string;
  }>;
};

export default async function EditBlogPage({
  params,
  searchParams,
}: EditBlogPageProps) {
  const { secretKey } = await searchParams;

  if (!secretKey || secretKey !== process.env.MY_SECRET_KEY) {
    return <div>404 Unauthorized</div>;
  }

  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post)
    return <p className="text-gray-500 text-[30px] mt-20">Post not found.</p>;

  const availableTags = await fetchAllTags();
  const postTags = await fetchTagsByPostId(post.id);
  const tagNames = postTags.map((tag) => tag.tag);

  return (
    <>
      <section className="flex p-6 flex-col w-full items-center justify-center">
        <h1 className="text-[22px] font-semibold mb-6">Edit the blog post</h1>
        <BlogEditForm
          post={post}
          tags={availableTags}
          postTags={tagNames}
        />
      </section>
    </>
  );
}
