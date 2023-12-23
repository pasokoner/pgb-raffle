import { db } from "$lib/server/db";
import { departments } from "$lib/server/db/schema";
import { desc, isNotNull } from "drizzle-orm";

export const load = async () => {
	const winners = await db
		.select()
		.from(departments)
		.where(isNotNull(departments.purgeDate))
		.orderBy(desc(departments.purgeDate));

	return {
		winners: winners
	};
};
