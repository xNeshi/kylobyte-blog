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
  imageUrl: z.url("Image URL is required").min(1, "Image URL cannot be empty"),
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
