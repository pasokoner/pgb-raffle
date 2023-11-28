ALTER TABLE "auth_user" ADD COLUMN "username" varchar(16);--> statement-breakpoint
ALTER TABLE "auth_user" ADD CONSTRAINT "auth_user_username_unique" UNIQUE("username");