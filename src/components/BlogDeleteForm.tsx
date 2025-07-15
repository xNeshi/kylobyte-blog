"use client";

import { deleteBlogPost } from "@/lib/actions/posts";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import FormErrorMessage from "./FormErrorMessage";
import { Button } from "./ui/button";

type BlogDeleteFormProps = {
  postTitleAndId: {
    title: string;
    id: string;
  };
};

export const BlogDeleteForm = ({ postTitleAndId }: BlogDeleteFormProps) => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const result = await deleteBlogPost(prevState, formData);
      if (result.status === "SUCCESS") router.push("/blogs");
      return result;
    },
    undefined
  );

  return (
    <form
      action={action}
      className="flex flex-col items-center max-w-[600px] justify-center w-full gap-5 mb-20"
    >
      <p className="text-gray-500 text-[16px] mb-4 text-center">
        By filling out this form, you are well aware that you are about to
        delete all necessary data relating to the blog{" "}
        <strong>"{postTitleAndId.title}"</strong>. Enter your delete secret key
        and confirm the blog slug to proceed with the deletion.
      </p>
      <input
        type="hidden"
        name="postId"
        value={postTitleAndId.id}
      />

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="slug"
          className="text-[18px]"
        >
          Blog Full Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          defaultValue={state?.fieldData.slug}
          className="w-full border-1 rounded-full p-2 px-5 text-[15px]"
          placeholder="Enter the full slug of the blog post"
        />
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="slug"
          isMultiLine
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="delSecretKey"
          className="text-[18px]"
        >
          Delete Secret Key
        </label>
        <input
          type="password"
          id="delSecretKey"
          name="delSecretKey"
          className="w-full border-1 rounded-full p-2 px-5 text-[15px]"
          placeholder="Enter your delete secret key"
        />
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="delSecretKey"
          isMultiLine
        />
      </div>
      <div className="flex flex-col w-full -mt-2">
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="invalid"
          isMultiLine
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
          {isPending ? "Deleting..." : "Delete Post"}
        </Button>
      </div>
    </form>
  );
};

export default BlogDeleteForm;
