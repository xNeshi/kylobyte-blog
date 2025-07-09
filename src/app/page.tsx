import HeaderTitle from "@/components/HeaderTitle";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <div className="max-w-[1280px]">
      <HeaderTitle />

      <section className="flex flex-col justify-center p-6 laptop:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">Recent blog posts</h3>
        <div className="grid grid-cols-1 gap-y-9 gap-x-3 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <PostCard
              key={i}
              recent
              featured={i === 0 || i === 3}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-center p-6 laptop:px-0">
        <h3 className="text-[22px] mb-6 font-semibold">All blog posts</h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-9 gap-x-3 mb-9">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
    </div>
  );
}
