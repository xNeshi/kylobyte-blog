import PostTag from "./PostTag";

type PostCardProps = {
  recent?: boolean;
  featured?: boolean;
};

export const PostCard = ({
  recent = false,
  featured = false,
}: PostCardProps) => {
  return (
    <div
      className={`${
        recent
          ? `${featured ? "post-card" : "post-card tablet:flex-row"}`
          : "post-card"
      }`}
    >
      <div
        className={`${
          featured
            ? "w-full aspect-[9/6] flex-[45%] bg-red-200 tablet:aspect-[9/3]"
            : "w-full aspect-[9/6] flex-[45%] bg-red-200"
        }`}
      ></div>
      <div className="flex flex-[55%] flex-col items-start gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] text-[var(--date-foreground)] font-semibold">
            Sunday, 1 Jan 2023
          </h3>
          <h1 className="text-[23px] font-semibold">UX review presentations</h1>
          <p className="text-[15px] text-[var(--muted-foreground)] line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PostTag label="UX" />
          <PostTag label="Design" />
          <PostTag label="Presentations" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
