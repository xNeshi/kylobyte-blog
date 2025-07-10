import { comments, posts, postTag, tag } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

async function main() {
  console.log("🌱 Starting seed...");

  const client = neon(process.env.DATABASE_URL!);
  const db = drizzle(client);

  await db.delete(postTag);
  await db.delete(comments);
  await db.delete(tag);
  await db.delete(posts);

  const insertedTags = await db
    .insert(tag)
    .values([
      { name: "Next.js" },
      { name: "JavaScript" },
      { name: "WebDev" },
      { name: "Design" },
      { name: "Database" },
      { name: "TypeScript" },
    ])
    .returning();

  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        slug: "my-first-post",
        title: "My First Post",
        imageUrl: "/images/sample-1.jpg",
        content: `
Welcome to my very first post!

This marks the beginning of my journey documenting everything I learn, build, and explore in the world of web development. Over time, I’ve realized that writing things down not only helps others but reinforces what I’ve learned myself.

In this post, I'll cover:

- Why I started this blog
- My current tech stack
- What kind of posts you can expect here

This blog will be raw, honest, and full of real-world learnings. Whether it's code snippets, project breakdowns, or just lessons learned the hard way — I’ll be sharing it all. Thank you for joining me at the start. Let’s grow together!
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
      {
        slug: "second-post-about-web-dev",
        title: "Second Post About Web Dev",
        imageUrl: "/images/sample-2.jpg",
        content: `
Let’s talk about the reality of being a web developer in 2025.

JavaScript frameworks have exploded. Build tools are more powerful than ever. And choosing the right stack feels like a mini-research paper. But at the core of it all, the fundamentals still matter.

In this post I’ll share:

- What I wish I knew earlier in my journey
- Why knowing vanilla JS is still gold
- My thoughts on React vs Next.js
- How to avoid tutorial hell

There’s no one-size-fits-all solution in web development. But I hope this post helps guide you toward building solid, maintainable apps with clarity and confidence.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "design-matters-in-modern-web",
        title: "Design Matters in Modern Web",
        imageUrl: "/images/sample-3.jpg",
        content: `
Design is not just about looking pretty. It’s about communication, clarity, and usability.

In this post, I want to talk about:

- How design impacts first impressions
- Why UX > visual flashiness
- The importance of spacing, color, and consistency
- Tips for devs who don’t have a design background

I’ll also share examples of beautiful UI patterns and how to implement them using Tailwind CSS and Figma exports. Great design elevates good products into unforgettable ones — and it’s worth learning.
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
      {
        slug: "getting-started-with-typescript",
        title: "Getting Started with TypeScript",
        imageUrl: "/images/sample-4.jpg",
        content: `
TypeScript can feel overwhelming when you first start—but trust me, it’s worth the effort.

In this post, I’ll walk you through:

- Why I switched to TypeScript
- How types help you refactor safely
- Common beginner mistakes (and how to avoid them)
- My favorite utility types and patterns

I’ll also give real-world examples showing how TypeScript helped me catch bugs early, structure my code better, and collaborate more effectively. By the end of this, you’ll wonder how you ever lived without it.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "using-postgresql-without-pain",
        title: "Using PostgreSQL Without Pain",
        imageUrl: "/images/sample-5.jpg",
        content: `
PostgreSQL is incredibly powerful, but getting started can be intimidating.

This post will focus on:

- Setting up your first database using Neon or Supabase
- Basic queries for real-world use
- The magic of relational data
- Avoiding performance traps

I’ll also go over schema design tips, query optimization, and why PostgreSQL is my go-to for nearly every backend. If SQL has ever scared you, this post will hopefully be a breath of fresh air.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "nextjs-app-router-tips",
        title: "Next.js App Router Tips",
        imageUrl: "/images/sample-6.jpg",
        content: `
Next.js App Router is powerful, but it comes with new concepts and challenges.

This post will unpack:

- Route groups and layout.tsx
- Server vs client components: when to use each
- Data fetching with \`fetch\`, \`cache\`, and \`revalidate\`
- SEO strategies in the App Router era

I’ll also compare it with the Pages Router and talk about migration strategies. If you're planning a new project or upgrading an old one, this guide will help you get the most out of Next 13+.
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
    ])
    .returning();

  await db.insert(postTag).values([
    { postId: insertedPosts[0].id, tagId: insertedTags[0].id },
    { postId: insertedPosts[0].id, tagId: insertedTags[2].id },
    { postId: insertedPosts[1].id, tagId: insertedTags[1].id },
    { postId: insertedPosts[1].id, tagId: insertedTags[2].id },
    { postId: insertedPosts[2].id, tagId: insertedTags[3].id },
    { postId: insertedPosts[2].id, tagId: insertedTags[2].id },
    { postId: insertedPosts[3].id, tagId: insertedTags[5].id },
    { postId: insertedPosts[3].id, tagId: insertedTags[1].id },
    { postId: insertedPosts[4].id, tagId: insertedTags[4].id },
    { postId: insertedPosts[4].id, tagId: insertedTags[2].id },
    { postId: insertedPosts[5].id, tagId: insertedTags[0].id },
    { postId: insertedPosts[5].id, tagId: insertedTags[5].id },
  ]);

  await db.insert(comments).values([
    {
      postId: insertedPosts[0].id,
      author: "Alice",
      content: "Really helpful article, thank you!",
    },
    {
      postId: insertedPosts[0].id,
      content: "Great intro post!",
    },
    {
      postId: insertedPosts[1].id,
      author: "Bob",
      content: "Love the way you explained things.",
    },
    {
      postId: insertedPosts[2].id,
      author: "Charlie",
      content: "Design really is everything.",
    },
    {
      postId: insertedPosts[3].id,
      content: "Finally someone who made TypeScript easy to understand.",
    },
    {
      postId: insertedPosts[4].id,
      author: "Dana",
      content: "PostgreSQL scared me before, this helped a lot.",
    },
    {
      postId: insertedPosts[5].id,
      content: "Next.js App Router is 🔥",
    },
  ]);
  console.log(await db.select().from(posts));
  console.log("✅ Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
