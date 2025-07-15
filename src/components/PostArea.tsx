import { fetchPostsBySearchAndPage } from "@/lib/actions/posts";
import PostList from "./PostList";
import PostPagination from "./PostPagination";

type PostAreaProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export const PostArea = async ({ searchParams }: PostAreaProps) => {
  const { page = "1", search = "" } = await searchParams;
  const {
    posts,
    pagesCount = 0,
    perPage,
  } = await fetchPostsBySearchAndPage(search, Number(page));

  return (
    <>
      <PostList
        posts={posts}
        search={search}
      />
      <PostPagination
        search={search}
        page={Number(page)}
        totalPages={Math.ceil(pagesCount / perPage)}
      />
    </>
  );
};

export default PostArea;
