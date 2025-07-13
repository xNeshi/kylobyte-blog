import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  json,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
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
  content: json("content").notNull(),
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

export type SelectPost = InferSelectModel<typeof posts>;
export type SelectComment = InferSelectModel<typeof comments>;
export type SelectTag = InferSelectModel<typeof tag>;
export type SelectPostTag = InferSelectModel<typeof postTag>;

export type InsertPost = InferInsertModel<typeof posts>;
export type InsertComment = InferInsertModel<typeof comments>;
export type InsertTag = InferInsertModel<typeof tag>;
export type InsertPostTag = InferInsertModel<typeof postTag>;
