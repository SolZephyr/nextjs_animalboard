CREATE TABLE "user_post_likes" (
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "user_post_likes_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "user_post_likes" ADD CONSTRAINT "user_post_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_post_likes" ADD CONSTRAINT "user_post_likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;