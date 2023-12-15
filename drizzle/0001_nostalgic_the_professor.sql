CREATE TABLE IF NOT EXISTS "major_prizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "minor_prizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "prizes";--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employees_minor_prize_prizes_id_fk";
--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employees_major_prize_prizes_id_fk";
--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "minor_prize_id" uuid;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "major_prize_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_minor_prize_id_minor_prizes_id_fk" FOREIGN KEY ("minor_prize_id") REFERENCES "minor_prizes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_major_prize_id_major_prizes_id_fk" FOREIGN KEY ("major_prize_id") REFERENCES "major_prizes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "minor_prize";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "major_prize";