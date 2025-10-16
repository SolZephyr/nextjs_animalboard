CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar(50) NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"profile_id" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "media_to_post" (
	"post_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	CONSTRAINT "media_to_post_post_id_media_id_pk" PRIMARY KEY("post_id","media_id")
);
--> statement-breakpoint
ALTER TABLE "media_to_post" ADD CONSTRAINT "media_to_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_to_post" ADD CONSTRAINT "media_to_post_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;