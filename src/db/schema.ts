import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const posts = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  content: text("content").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  author: varchar("author", { length: 100 }).notNull().default("Anonymous"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull().unique(),
});

export const postTag = pgTable(
  "post_tag",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: serial("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tagId] })]
);

type SelectPost = InferSelectModel<typeof posts>;
type SelectComment = InferSelectModel<typeof comments>;
type SelectTag = InferSelectModel<typeof tag>;
type SelectPostTag = InferSelectModel<typeof postTag>;

type InsertPost = InferInsertModel<typeof posts>;
type InsertComment = InferInsertModel<typeof comments>;
type InsertTag = InferInsertModel<typeof tag>;
type InsertPostTag = InferInsertModel<typeof postTag>;
