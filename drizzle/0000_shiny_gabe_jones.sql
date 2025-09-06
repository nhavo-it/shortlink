CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(64) NOT NULL,
	"url" text NOT NULL,
	"title" varchar(255),
	"owner_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
