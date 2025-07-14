import { z } from "zod";

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(50000, "Content must be less than 50,000 characters"),
  file: z.custom<File | null>().refine(
    (file) => {
      return (
        file instanceof File && file.size > 0 && file.type.startsWith("image/")
      );
    },
    {
      message: "Valid image file is required",
    }
  ),
  tags: z
    .array(z.string())
    .min(2, "At least two tag is required")
    .max(10, "Maximum of 10 tags allowed"),
  featured: z
    .boolean()
    .default(false)
    .transform((val) => Boolean(val)),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
