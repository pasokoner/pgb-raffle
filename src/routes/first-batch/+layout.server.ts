import { db } from "$lib/server/db";
import { sql, eq, not } from "drizzle-orm";
import { departments } from "$lib/server/db/schema";

export const load = async () => {
	const departmentsCount = await db
		.select({
			count: sql<number>`cast(count(${departments.id}) as int)`
		})
		.from(departments)
		.where(not(eq(departments.name, "PGO-OTHERS")));

	return { count: departmentsCount[0].count };
};
