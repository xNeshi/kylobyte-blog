ALTER TABLE "blog" RENAME TO "posts";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "blog_slug_unique";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "post_tag" DROP CONSTRAINT "post_tag_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_unique" UNIQUE("slug");