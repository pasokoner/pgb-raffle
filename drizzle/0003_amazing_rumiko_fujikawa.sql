ALTER TABLE "departments" ALTER COLUMN "purge_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "major_prizes" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "minor_prizes" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;