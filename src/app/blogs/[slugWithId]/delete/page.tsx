import BlogDeleteForm from "@/components/BlogDeleteForm";
import NotExist from "@/components/NotExist";
import { fetchPostsBySlugWithId } from "@/lib/actions/posts";

type DeleteBlogPageProps = {
  params: Promise<{
    slugWithId: string;
  }>;
  searchParams: Promise<{
    secretKey?: string;
  }>;
};

export default async function DeleteBlogPage({
  params,
  searchParams,
}: DeleteBlogPageProps) {
  const { secretKey } = await searchParams;

  if (!secretKey || secretKey !== process.env.MY_SECRET_KEY) {
    return <NotExist>404 Not Authorized</NotExist>;
  }

  const { slugWithId } = await params;
  const post = await fetchPostsBySlugWithId(slugWithId);

  if (!post)
    return <p className="text-gray-500 text-[30px] mt-20">Post not found.</p>;

  return (
    <>
      <section className="flex p-6 flex-col w-full items-center justify-center">
        <h1 className="text-[22px] font-semibold mb-6">Delete the blog post</h1>

        <BlogDeleteForm post={post} />
      </section>
    </>
  );
}
