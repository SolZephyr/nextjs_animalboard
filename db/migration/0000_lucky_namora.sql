CREATE TABLE "profiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"nicknames" varchar(100) NOT NULL,
	"user" varchar(50) NOT NULL,
	"avatar" varchar(100) NOT NULL,
	"animal" varchar(50) NOT NULL,
	"breed" varchar(50) NOT NULL,
	"country" varchar(50) NOT NULL,
	"home" varchar(50) NOT NULL,
	"about" text NOT NULL,
	"dateOfBirth" timestamp,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "test_users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "test_users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(50) NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp,
	CONSTRAINT "test_users_email_unique" UNIQUE("email")
);
