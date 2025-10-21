CREATE TABLE "user_profile_favourites" (
	"user_id" integer NOT NULL,
	"profile_id" integer NOT NULL,
	CONSTRAINT "user_profile_favourites_user_id_profile_id_pk" PRIMARY KEY("user_id","profile_id")
);
--> statement-breakpoint
ALTER TABLE "user_profile_favourites" ADD CONSTRAINT "user_profile_favourites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_favourites" ADD CONSTRAINT "user_profile_favourites_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;