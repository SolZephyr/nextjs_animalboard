CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar(50) NOT NULL,
	"source" varchar(255) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "avatar_id" integer;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "avatar";