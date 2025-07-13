"use client";

import { SelectTag } from "@/db/schema";
import { createBlogPost } from "@/lib/actions/posts";
import { useUploadThing } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";
import { Star } from "lucide-react";
import { useActionState, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import ImageUpload from "./ImageUpload";
import { TagInput } from "./TagInput";

type BlogCreateFormProps = {
  tags: SelectTag[];
};

export const BlogCreateForm = ({ tags }: BlogCreateFormProps) => {
  const { startUpload } = useUploadThing("imageUploader");
  const [file, setFile] = useState<File[] | null>(null);
  const [value, setValue] = useState<string>("");

  const [isFeatured, setIsFeatured] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [state, action, isPending] = useActionState(createBlogPost, undefined);

  const handleSubmit = async (formData: FormData) => {
    if (!file) return;

    try {
      const uploadResults = await startUpload(file);
      const uploadResult = uploadResults && uploadResults[0];
      if (!uploadResult?.ufsUrl) return;

      formData.append("imageUrl", uploadResult.ufsUrl);
      formData.append("content", value);
      formData.append("tags", JSON.stringify(selectedTags));
      action(formData);
      return;
    } catch (error) {
      return;
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center max-w-[800px] justify-center w-full gap-5"
    >
      <div className="flex flex-col w-full gap-2 mt-3 mb-4">
        <ImageUpload onFileChange={setFile} />
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
          id="description"
          placeholder="Enter a brief description of your blog"
          className="w-full border-1 rounded-3xl p-2 py-3 scroll-mr-2 px-5 text-[15px] h-[100px]"
        ></textarea>
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
            height={600}
            className="!bg-[var(--background)] !text-[var(--foreground)]"
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
      </div>
    </form>
  );
};

export default BlogCreateForm;
