import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PostPaginationProps = {
  page: number;
  search: string;
  totalPages: number;
};

export const PostPagination = ({
  page,
  search,
  totalPages,
}: PostPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent className="mt-10">
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={`/blogs?page=${page - 1}&search=${search}`}
              />
            </PaginationItem>
            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={false}
                href={`/blogs?page=${page - 1}&search=${search}`}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            isActive
            href={`/blogs?page=${page}&search=${search}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={`/blogs?page=${page + 1}&search=${search}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={`/blogs?page=${page + 1}&search=${search}`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;
