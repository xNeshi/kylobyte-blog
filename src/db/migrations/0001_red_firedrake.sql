ALTER TABLE "blog" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "updated_at" timestamp DEFAULT now();