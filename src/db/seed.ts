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
        imageUrl: "/images/sample-1.jpg",
        content: `
Welcome to my very first post!

This marks the beginning of my journey documenting everything I learn, build, and explore in the world of web development. Over time, I've realized that writing things down not only helps others but reinforces what I've learned myself.

In this post, I'll cover:

- Why I started this blog
- My current tech stack
- What kind of posts you can expect here

This blog will be raw, honest, and full of real-world learnings. Whether it's code snippets, project breakdowns, or just lessons learned the hard way — I'll be sharing it all. Thank you for joining me at the start. Let's grow together!
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
Let's talk about the reality of being a web developer in 2025.

JavaScript frameworks have exploded. Build tools are more powerful than ever. And choosing the right stack feels like a mini-research paper. But at the core of it all, the fundamentals still matter.

In this post I'll share:

- What I wish I knew earlier in my journey
- Why knowing vanilla JS is still gold
- My thoughts on React vs Next.js
- How to avoid tutorial hell

There's no one-size-fits-all solution in web development. But I hope this post helps guide you toward building solid, maintainable apps with clarity and confidence.
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
Design is not just about looking pretty. It's about communication, clarity, and usability.

In this post, I want to talk about:

- How design impacts first impressions
- Why UX > visual flashiness
- The importance of spacing, color, and consistency
- Tips for devs who don't have a design background

I'll also share examples of beautiful UI patterns and how to implement them using Tailwind CSS and Figma exports. Great design elevates good products into unforgettable ones — and it's worth learning.
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
TypeScript can feel overwhelming when you first start—but trust me, it's worth the effort.

In this post, I'll walk you through:

- Why I switched to TypeScript
- How types help you refactor safely
- Common beginner mistakes (and how to avoid them)
- My favorite utility types and patterns

I'll also give real-world examples showing how TypeScript helped me catch bugs early, structure my code better, and collaborate more effectively. By the end of this, you'll wonder how you ever lived without it.
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

I'll also go over schema design tips, query optimization, and why PostgreSQL is my go-to for nearly every backend. If SQL has ever scared you, this post will hopefully be a breath of fresh air.
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

I'll also compare it with the Pages Router and talk about migration strategies. If you're planning a new project or upgrading an old one, this guide will help you get the most out of Next 13+.
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
      {
        slug: "react-performance-optimization",
        title: "React Performance Optimization",
        imageUrl: "/images/sample-7.jpg",
        content: `
Is your React app feeling sluggish? Let's fix that.

In this deep dive, we'll cover:

- Common performance bottlenecks in React
- When to use useMemo and useCallback
- Virtualized lists for large datasets
- Lazy loading components
- Profiling with React DevTools

Performance matters more than ever in 2025, and I'll show you practical techniques to make your React apps buttery smooth. These optimizations helped reduce our bundle size by 40% and improved interaction latency by 60%.
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
      {
        slug: "modern-css-techniques",
        title: "Modern CSS Techniques You Should Know",
        imageUrl: "/images/sample-8.jpg",
        content: `
CSS has evolved dramatically in recent years. Here's what's worth learning in 2025.

Topics include:

- Container queries (finally!)
- CSS nesting
- :has() selector magic
- Scroll-driven animations
- View transitions API
- Cascade layers

I'll provide real examples of how these new features can simplify your stylesheets and enable effects that previously required JavaScript. CSS is more powerful than ever, and it's time to take advantage of that.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "web-security-best-practices",
        title: "Web Security Best Practices in 2025",
        imageUrl: "/images/sample-9.jpg",
        content: `
Security can't be an afterthought. Here's how to protect your web apps.

We'll examine:

- Modern authentication patterns
- CSP headers that actually work
- Dealing with XSS in 2025
- Secure cookie settings
- API security essentials
- The latest in CSRF protection

I've compiled lessons from security audits of dozens of production apps. Follow these practices and sleep better knowing your app isn't the low-hanging fruit for attackers.
`
          .repeat(3)
          .trim(),
        isFeatured: true,
      },
      {
        slug: "ai-for-web-developers",
        title: "AI for Web Developers: Practical Applications",
        imageUrl: "/images/sample-10.jpg",
        content: `
AI isn't just hype—it's a powerful tool for developers. Here's how I use it daily.

In this post:

- Generating realistic test data
- Automating documentation
- Code explanation and refactoring
- AI-assisted debugging
- Building smarter UIs with embeddings
- When NOT to use AI

I'll share specific examples of how AI tools have made me 30% more productive while maintaining code quality. The key is knowing where it helps and where it hinders.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "testing-strategies-that-scale",
        title: "Testing Strategies That Actually Scale",
        imageUrl: "/images/sample-11.jpg",
        content: `
Tired of brittle tests that break with every change? Let's fix your test suite.

We'll explore:

- The testing pyramid in 2025
- Writing maintainable unit tests
- Effective integration testing
- When to use mocks vs real services
- Visual regression testing
- Performance testing as part of CI

After implementing these strategies, our team reduced flaky tests by 85% and cut CI time in half. Tests should enable change, not prevent it.
`
          .repeat(3)
          .trim(),
        isFeatured: false,
      },
      {
        slug: "building-accessible-web-apps",
        title: "Building Truly Accessible Web Apps",
        imageUrl: "/images/sample-12.jpg",
        content: `
Accessibility isn't optional—it's essential. Here's how to do it right.

Key topics:

- Semantic HTML you're probably missing
- ARIA attributes when you need them
- Keyboard navigation patterns
- Screen reader testing
- Color contrast and readability
- Accessible forms and error handling

I'll share lessons from working with accessibility experts and real users with disabilities. These practices will make your apps usable by everyone while often improving the experience for all users.
`
          .repeat(3)
          .trim(),
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

    // Seventh post (React Performance) - 8 tags
    { postId: insertedPosts[6].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[6].id, tagId: insertedTags[8].id }, // Performance
    { postId: insertedPosts[6].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[6].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[6].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[6].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[6].id, tagId: insertedTags[7].id }, // CSS
    { postId: insertedPosts[6].id, tagId: insertedTags[11].id }, // Testing

    // Eighth post (CSS) - 5 tags
    { postId: insertedPosts[7].id, tagId: insertedTags[7].id }, // CSS
    { postId: insertedPosts[7].id, tagId: insertedTags[3].id }, // Design
    { postId: insertedPosts[7].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[7].id, tagId: insertedTags[8].id }, // Performance
    { postId: insertedPosts[7].id, tagId: insertedTags[6].id }, // React

    // Ninth post (Security) - 6 tags
    { postId: insertedPosts[8].id, tagId: insertedTags[9].id }, // Security
    { postId: insertedPosts[8].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[8].id, tagId: insertedTags[4].id }, // Database
    { postId: insertedPosts[8].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[8].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[8].id, tagId: insertedTags[11].id }, // Testing

    // Tenth post (AI) - 5 tags
    { postId: insertedPosts[9].id, tagId: insertedTags[10].id }, // AI
    { postId: insertedPosts[9].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[9].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[9].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[9].id, tagId: insertedTags[11].id }, // Testing

    // Eleventh post (Testing) - 7 tags
    { postId: insertedPosts[10].id, tagId: insertedTags[11].id }, // Testing
    { postId: insertedPosts[10].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[10].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[10].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[10].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[10].id, tagId: insertedTags[8].id }, // Performance
    { postId: insertedPosts[10].id, tagId: insertedTags[9].id }, // Security

    // Twelfth post (Accessibility) - 6 tags
    { postId: insertedPosts[11].id, tagId: insertedTags[3].id }, // Design
    { postId: insertedPosts[11].id, tagId: insertedTags[7].id }, // CSS
    { postId: insertedPosts[11].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[11].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[11].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[11].id, tagId: insertedTags[8].id }, // Performance
  ]);

  // Add this to your existing seed script, just before the console.log("✅ Seed complete.")

  const sampleComments = [
    // Plain text comment
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Great post! Really helpful. 👍" }],
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
    // Comment with an emoji
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "This solved my issue! 🎉" }],
          },
        ],
      },
    },
    // Comment with a mention (if applicable)
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Hey " },
              {
                type: "text",
                marks: [{ type: "mention", attrs: { id: "user123" } }],
                text: "@admin",
              },
              { type: "text", text: ", can you clarify this part?" },
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
    const commentCount = Math.floor(Math.random() * 4) + 2; // 2-5 comments per post

    for (let i = 0; i < commentCount; i++) {
      const randomComment =
        sampleComments[Math.floor(Math.random() * sampleComments.length)];

      await db.insert(comments).values({
        postId: post.id,
        content: randomComment.content, // Tiptap-compatible JSON
      });
    }
  }
  console.log("✅ Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
