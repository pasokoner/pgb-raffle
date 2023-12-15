import { db } from "$lib/server/db";
import { sql } from "drizzle-orm";
import { departments } from "$lib/server/db/schema";

export const load = async () => {
	const departmentsCount = await db
		.select({
			count: sql<number>`cast(count(${departments.id}) as int)`
		})
		.from(departments);

	return { count: departmentsCount[0].count };
};
