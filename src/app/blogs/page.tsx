import PostCard from "@/components/PostCard";

export default function BlogsPage() {
  return (
    <>
      <section className="flex flex-col justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">All Blogs</h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-9 gap-x-5 mb-9">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
    </>
  );
}
