"use client";

import { SelectPost, SelectTag } from "@/db/schema";
import { updateBlogPost } from "@/lib/actions/posts";
import { slugify } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import FormErrorMessage from "./FormErrorMessage";
import ImageUpload from "./ImageUpload";
import { TagInput } from "./TagInput";
import { Button } from "./ui/button";

type BlogEditFormProps = {
  tags: SelectTag[];
  post: SelectPost;
  postTags: SelectTag[];
};

export const BlogEditForm = ({ tags, post, postTags }: BlogEditFormProps) => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateBlogPost, undefined);
  const [file, setFile] = useState<File[] | null>(null);
  const [value, setValue] = useState(post.content);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    postTags.map((tag) => tag.name)
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(post.isFeatured);

  const handleSubmit = async (formData: FormData) => {
    formData.append("postId", post.id);
    formData.append("title", formData.get("title") as string);
    formData.append("content", value);
    formData.append("description", formData.get("description") as string);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("featured", isFeatured.toString());

    if (file) {
      formData.append("file", file[0]);
    } else {
      formData.append("file", "");
    }

    action(formData);
  };

  useEffect(() => {
    if (state?.status === "SUCCESS") {
      const slug = slugify(state.post?.title!);
      router.replace(`/blogs/${slug}-${post.id.slice(0, 8)}`);
    }
  }, [state]);

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center max-w-[800px] justify-center w-full gap-5 mb-20"
    >
      <div className="flex flex-col w-full gap-2 mt-3 mb-4">
        <ImageUpload
          onFileChange={setFile}
          currentImage={post.imageUrl}
        />
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="file"
          isMultiLine
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="title"
          className="text-[18px]"
        >
          Blog Title
        </label>
        <div className="flex items-center w-full justify-between gap-5">
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            className="w-full border-1 rounded-full p-2 px-5 text-[15px]"
            placeholder="Enter your blog title"
          />
          <div className="flex gap-1 w-fit">
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="hidden"
              />
              <Star
                className={`w-5 h-5 mr-2 transition-all duration-200 ease-in-out 
                  ${
                    isFeatured
                      ? "fill-yellow-400 stroke-yellow-400 scale-110"
                      : "stroke-current scale-100"
                  }`}
              />
            </label>
            <label
              htmlFor="featured"
              className="whitespace-nowrap hidden lphone:block cursor-pointer"
              onClick={() => setIsFeatured(!isFeatured)}
            >
              Feature This Post
            </label>
          </div>
        </div>
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="title"
          isMultiLine
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="description"
          className="text-[18px]"
        >
          Blog Description
        </label>
        <textarea
          name="description"
          defaultValue={post.description}
          id="description"
          placeholder="Enter a brief description of your blog"
          className="w-full border-1 rounded-3xl p-2 py-3 scroll-mr-2 px-5 text-[15px] h-[100px]"
        ></textarea>
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="description"
          isMultiLine
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="description"
          className="text-[18px]"
        >
          Tags
        </label>
        <TagInput
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="tags"
          isMultiLine
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <label
          htmlFor="content"
          className="text-[18px]"
        >
          Contents
        </label>
        <div className="rounded-3xl border overflow-hidden">
          <MDEditor
            value={value}
            onChange={(prev) => setValue(prev ?? "")}
            id="content"
            preview="edit"
            height={400}
            className="!bg-background !text-foreground"
            style={{
              padding: "0.5rem",
            }}
            textareaProps={{
              placeholder: "Describe your Blog and give the Necessary Details",
            }}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <FormErrorMessage
          error={state?.fieldErrors}
          errorFor="content"
          isMultiLine
        />
      </div>

      <div className="flex flex-col lphone:flex-row w-full gap-2 justify-end mt-3">
        <Button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="rounded-full w-full disabled:bg-gray-400 lphone:w-fit  pr-7 px-6 bg-red-500 hover:bg-red-700 active:bg-red-800 text-white transition duration-300 ease-in-out"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-full w-full disabled:bg-gray-400 lphone:w-fit px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition duration-300 ease-in-out"
        >
          {isPending ? "Submitting..." : "Submit Post"}
        </Button>
      </div>
    </form>
  );
};

export default BlogEditForm;
