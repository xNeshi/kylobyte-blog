import BlogCreateForm from "@/components/BlogCreateForm";

type CreateBlogPageProps = {
  searchParams: Promise<{
    secretKey?: string;
  }>;
};

export default async function CreateBlogPage({
  searchParams,
}: CreateBlogPageProps) {
  const { secretKey } = await searchParams;

  if (!secretKey || secretKey !== process.env.MY_SECRET_KEY) {
    return <div>404 Unauthorized</div>;
  }

  return (
    <>
      <section className="flex p-6 flex-col w-full items-center justify-center">
        <h1 className="text-[22px] font-semibold mb-6">Create a blog post</h1>
        <BlogCreateForm />
      </section>
    </>
  );
}
