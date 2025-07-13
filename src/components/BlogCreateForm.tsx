"use client";

import { createBlogPost } from "@/lib/actions/posts";
import { useUploadThing } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";
import { useActionState, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import ImageUpload from "./ImageUpload";

export const BlogCreateForm = () => {
  const [file, setFile] = useState<File[] | null>(null);
  const { startUpload } = useUploadThing("imageUploader");
  const [value, setValue] = useState<string>("");

  const [state, action, isPending] = useActionState(createBlogPost, undefined);

  const handleSubmit = async (formData: FormData) => {
    if (!file) return;

    try {
      const uploadResults = await startUpload(file);
      const uploadResult = uploadResults && uploadResults[0];
      if (!uploadResult?.ufsUrl) return;

      formData.append("imageUrl", uploadResult.ufsUrl);
      action(formData);
      return;
    } catch (error) {
      return;
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center max-w-[600px] justify-center w-full gap-5"
    >
      <div className="flex flex-col w-full gap-2">
        <ImageUpload onFileChange={setFile} />
      </div>
      <div className="flex flex-col w-full gap-2 mt-10">
        <label htmlFor="title">Blog Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border-1 rounded-full p-1 px-5 text-[15px]"
          placeholder="Enter your blog title"
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <label htmlFor="content">Contents</label>

        <MDEditor
          value={value}
          onChange={(prev) => setValue(prev ?? "")}
          id="content"
          preview="edit"
          height={300}
          className=""
          style={{
            borderRadius: 25,
            overflow: "hidden",
            border: "1px",
            padding: "0.5rem",
            backgroundColor: "var(--background)",
          }}
          textareaProps={{
            placeholder:
              "Describe your Project Concept and give the Necessary Details",
          }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
    </form>
  );
};

export default BlogCreateForm;
