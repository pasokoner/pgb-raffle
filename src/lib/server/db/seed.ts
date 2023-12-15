// src/db/seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { departments, employees } from "./schema";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

if (!("DATABASE_URL" in process.env)) throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
	const client = postgres(process.env.DATABASE_URL as string);
	const db = drizzle(client);

	const data: (typeof employees.$inferInsert)[] = [];

	const departmentIds = await db
		.select({
			id: departments.id
		})
		.from(departments);

	for (let i = 0; i < departmentIds.length; i++) {
		for (let j = 0; j < 50; j++) {
			data.push({
				name: faker.person.fullName(),
				departmentId: departmentIds[i].id
			});
		}
	}

	console.log("Seed start");
	await db.insert(employees).values(data);
	console.log("Seed done");
};

main();
