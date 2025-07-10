import { db } from "@/db/index";
import { comments, posts, postTag, tag } from "@/db/schema";

async function main() {
  console.log("🌱 Starting seed...");

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
        slug: "first-post",
        title: "My First Post",
        imageUrl: "/images/sample-1.jpg",
        content: "This is the content of the first post.",
      },
      {
        slug: "second-post",
        title: "Second Post About Web Dev",
        imageUrl: "/images/sample-2.jpg",
        content: "Content of the second post.",
      },
      {
        slug: "third-post",
        title: "Design Matters in Modern Web",
        imageUrl: "/images/sample-3.jpg",
        content: "Exploring the importance of design in web development.",
      },
      {
        slug: "fourth-post",
        title: "Getting Started with TypeScript",
        imageUrl: "/images/sample-4.jpg",
        content: "Everything you need to know as a beginner in TypeScript.",
      },
      {
        slug: "fifth-post",
        title: "Using PostgreSQL Without Pain",
        imageUrl: "/images/sample-5.jpg",
        content: "How to get the most out of PostgreSQL in modern apps.",
      },
      {
        slug: "sixth-post",
        title: "Next.js App Router Tips",
        imageUrl: "/images/sample-6.jpg",
        content: "Tricks and tips when using the new App Router.",
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

  console.log("✅ Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
