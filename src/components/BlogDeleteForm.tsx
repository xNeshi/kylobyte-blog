"use client";

import { SelectPost } from "@/db/schema";
import { updateBlogPost } from "@/lib/actions/posts";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";

type BlogDeleteFormProps = {
  post: SelectPost;
};

export const BlogDeleteForm = ({ post }: BlogDeleteFormProps) => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateBlogPost, undefined);

  useEffect(() => {
    if (state?.status === "SUCCESS") {
      const slug = slugify(state.post?.title!);
      router.replace(`/blogs/${slug}-${post.id.slice(0, 8)}`);
    }
  }, [state]);

  return (
    <form
      action={action}
      className="flex flex-col items-center max-w-[600px] justify-center w-full gap-5 mb-20"
    >
      <p className="text-gray-500 text-[16px] mb-4 text-center">
        By filling out this form, you are well aware that you are about to
        delete all necessary data relating to the blog{" "}
        <strong>"{post.title}"</strong>. Enter your delete secret key and
        confirm the blog slug to proceed with the deletion.
      </p>
      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="del-secret-key"
          className="text-[18px]"
        >
          Delete Secret Key
        </label>
        <input
          type="password"
          id="del-secret-key"
          name="del-secret-key"
          className="w-full border-1 rounded-full p-2 px-5 text-[15px]"
          placeholder="Enter your delete secret key"
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="slug"
          className="text-[18px]"
        >
          Blog Full Secret
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          className="w-full border-1 rounded-full p-2 px-5 text-[15px]"
          placeholder="Enter the full slug of the blog post"
        />
      </div>

      <div className="flex flex-col lphone:flex-row w-full gap-2 justify-end mt-5">
        <Button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="rounded-full w-full disabled:bg-gray-400 lphone:w-fit  pr-7 px-6 border-1  transition duration-300 ease-in-out"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-full w-full disabled:bg-gray-400 lphone:w-fit px-6 text-white bg-red-500 hover:bg-red-700 active:bg-red-800 transition duration-300 ease-in-out"
        >
          {isPending ? "Submitting..." : "Delete Post"}
        </Button>
      </div>
    </form>
  );
};

export default BlogDeleteForm;
