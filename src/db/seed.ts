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
      { name: "React" },
      { name: "CSS" },
      { name: "Performance" },
      { name: "Security" },
      { name: "AI" },
      { name: "Testing" },
    ])
    .returning();

  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        slug: "my-first-post",
        title: "My First Post",
        description:
          "Welcome to my blog where I'll share my web development journey, from beginner lessons to advanced techniques. Join me as I explore modern web technologies.",
        imageUrl: "/images/sample-1.jpg",
        content: `
Welcome to my very first post!

This marks the beginning of my journey documenting everything I learn, build, and explore in the world of web development. Over time, I've realized that writing things down not only helps others but reinforces what I've learned myself.

In this post, I'll cover:

- Why I started this blog
- My current tech stack
- What kind of posts you can expect here

This blog will be raw, honest, and full of real-world learnings. Whether it's code snippets, project breakdowns, or just lessons learned the hard way — I'll be sharing it all. Thank you for joining me at the start. Let's grow together!
`.trim(),
        isFeatured: true,
      },
      {
        slug: "second-post-about-web-dev",
        title: "Second Post About Web Dev",
        description:
          "Exploring the reality of web development in 2025 - JavaScript frameworks, build tools, and why fundamentals still matter most in our fast-evolving industry.",
        imageUrl: "/images/sample-2.jpg",
        content: `
Let's talk about the reality of being a web developer in 2025.

JavaScript frameworks have exploded. Build tools are more powerful than ever. And choosing the right stack feels like a mini-research paper. But at the core of it all, the fundamentals still matter.

In this post I'll share:

- What I wish I knew earlier in my journey
- Why knowing vanilla JS is still gold
- My thoughts on React vs Next.js
- How to avoid tutorial hell

There's no one-size-fits-all solution in web development. But I hope this post helps guide you toward building solid, maintainable apps with clarity and confidence.
`.trim(),
        isFeatured: false,
      },
      {
        slug: "design-matters-in-modern-web",
        title: "Design Matters in Modern Web",
        description:
          "Why design is more than aesthetics - it's about communication and usability. Tips for developers to improve their design skills and create better user experiences.",
        imageUrl: "/images/sample-3.jpg",
        content: `
Design is not just about looking pretty. It's about communication, clarity, and usability.

In this post, I want to talk about:

- How design impacts first impressions
- Why UX > visual flashiness
- The importance of spacing, color, and consistency
- Tips for devs who don't have a design background

I'll also share examples of beautiful UI patterns and how to implement them using Tailwind CSS and Figma exports. Great design elevates good products into unforgettable ones — and it's worth learning.
`.trim(),
        isFeatured: true,
      },
      {
        slug: "getting-started-with-typescript",
        title: "Getting Started with TypeScript",
        description:
          "A beginner's guide to TypeScript - why it's worth learning, common pitfalls to avoid, and how it can improve your code quality and developer experience.",
        imageUrl: "/images/sample-4.jpg",
        content: `
TypeScript can feel overwhelming when you first start—but trust me, it's worth the effort.

In this post, I'll walk you through:

- Why I switched to TypeScript
- How types help you refactor safely
- Common beginner mistakes (and how to avoid them)
- My favorite utility types and patterns

I'll also give real-world examples showing how TypeScript helped me catch bugs early, structure my code better, and collaborate more effectively. By the end of this, you'll wonder how you ever lived without it.
`.trim(),
        isFeatured: false,
      },
      {
        slug: "using-postgresql-without-pain",
        title: "Using PostgreSQL Without Pain",
        description:
          "PostgreSQL made approachable - from basic setup to performance optimization. Learn how to work with relational data effectively in your applications.",
        imageUrl: "/images/sample-5.jpg",
        content: `
PostgreSQL is incredibly powerful, but getting started can be intimidating.

This post will focus on:

- Setting up your first database using Neon or Supabase
- Basic queries for real-world use
- The magic of relational data
- Avoiding performance traps

I'll also go over schema design tips, query optimization, and why PostgreSQL is my go-to for nearly every backend. If SQL has ever scared you, this post will hopefully be a breath of fresh air.
`.trim(),
        isFeatured: false,
      },
      {
        slug: "nextjs-app-router-tips",
        title: "Next.js App Router Tips",
        description:
          "Mastering Next.js App Router - practical tips for route groups, component architecture, data fetching, and SEO strategies in the App Router era.",
        imageUrl: "/images/sample-6.jpg",
        content: `
Next.js App Router is powerful, but it comes with new concepts and challenges.

This post will unpack:

- Route groups and layout.tsx
- Server vs client components: when to use each
- Data fetching with \`fetch\`, \`cache\`, and \`revalidate\`
- SEO strategies in the App Router era

I'll also compare it with the Pages Router and talk about migration strategies. If you're planning a new project or upgrading an old one, this guide will help you get the most out of Next 13+.
`.trim(),
        isFeatured: true,
      },
    ])
    .returning();

  await db.insert(postTag).values([
    // First post - 5 tags
    { postId: insertedPosts[0].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[0].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[0].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[0].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[0].id, tagId: insertedTags[6].id }, // React

    // Second post - 4 tags
    { postId: insertedPosts[1].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[1].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[1].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[1].id, tagId: insertedTags[8].id }, // Performance

    // Third post - 6 tags
    { postId: insertedPosts[2].id, tagId: insertedTags[3].id }, // Design
    { postId: insertedPosts[2].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[2].id, tagId: insertedTags[7].id }, // CSS
    { postId: insertedPosts[2].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[2].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[2].id, tagId: insertedTags[8].id }, // Performance

    // Fourth post - 5 tags
    { postId: insertedPosts[3].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[3].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[3].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[3].id, tagId: insertedTags[11].id }, // Testing
    { postId: insertedPosts[3].id, tagId: insertedTags[8].id }, // Performance

    // Fifth post - 4 tags
    { postId: insertedPosts[4].id, tagId: insertedTags[4].id }, // Database
    { postId: insertedPosts[4].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[4].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[4].id, tagId: insertedTags[9].id }, // Security

    // Sixth post - 7 tags
    { postId: insertedPosts[5].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[5].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[5].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[5].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[5].id, tagId: insertedTags[8].id }, // Performance
    { postId: insertedPosts[5].id, tagId: insertedTags[9].id }, // Security
    { postId: insertedPosts[5].id, tagId: insertedTags[11].id }, // Testing
  ]);

  const textOnlyComments = [
    // Plain text comment
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Great post! Really helpful." }],
          },
        ],
      },
    },
    // Comment with bold & italic text
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "I " },
              { type: "text", marks: [{ type: "bold" }], text: "love" },
              { type: "text", text: " this! " },
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "So insightful.",
              },
            ],
          },
        ],
      },
    },
    // Multi-paragraph comment
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "First paragraph..." }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Second paragraph..." }],
          },
        ],
      },
    },
  ];

  // Assign comments to random posts
  for (const post of insertedPosts) {
    const commentCount = Math.floor(Math.random() * 3) + 2; // 2-4 comments per post

    for (let i = 0; i < commentCount; i++) {
      const randomComment =
        textOnlyComments[Math.floor(Math.random() * textOnlyComments.length)];

      await db.insert(comments).values({
        postId: post.id,
        content: randomComment.content,
      });
    }
  }

  console.log("✅ Seed complete. Created:", {
    tags: insertedTags.length,
    posts: insertedPosts.length,
  });
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
