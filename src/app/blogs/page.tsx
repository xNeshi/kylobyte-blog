import PostList from "@/components/PostList";
import PostPagination from "@/components/PostPagination";
import { fetchPostsBySearchAndPage } from "@/lib/actions/posts";

type BlogsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { page = "1", search = "" } = await searchParams;
  const {
    posts,
    pagesCount = 0,
    perPage,
  } = await fetchPostsBySearchAndPage(search, Number(page));

  const currentPage = Number(page);

  return (
    <>
      <section className="flex flex-col items-center justify-center p-6  min-[1280px]:px-0">
        <h3 className="text-[22px] mb-8 font-semibold ">All Blogs</h3>
        <PostList
          posts={posts}
          search={search}
        />
        <PostPagination
          search={search}
          page={currentPage}
          totalPages={Math.ceil(pagesCount / perPage)}
        />
      </section>
    </>
  );
}
