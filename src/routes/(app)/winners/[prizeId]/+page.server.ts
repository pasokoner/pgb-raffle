import { db } from "$lib/server/db";
import { departments, employees } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

export const load = async ({ params }) => {
	const majorWinners = await db
		.select()
		.from(employees)
		.fullJoin(departments, eq(departments.id, employees.departmentId))
		.where(eq(employees.majorPrizeId, params.prizeId));

	const minorWinners = await db
		.select()
		.from(employees)
		.fullJoin(departments, eq(departments.id, employees.departmentId))
		.where(eq(employees.minorPrizeId, params.prizeId));

	return {
		winners: [...majorWinners, ...minorWinners]
	};
};
