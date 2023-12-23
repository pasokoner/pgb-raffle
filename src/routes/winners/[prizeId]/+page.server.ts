import { db } from "$lib/server/db";
import { departments, employees, majorPrizes, minorPrizes } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

export const load = async ({ params }) => {
	const majorWinners = await db
		.select()
		.from(employees)
		.fullJoin(departments, eq(departments.id, employees.departmentId))
		.where(eq(employees.majorPrizeId, params.prizeId))
		.orderBy(departments.name);

	const minorWinners = await db
		.select()
		.from(employees)
		.fullJoin(departments, eq(departments.id, employees.departmentId))
		.where(eq(employees.minorPrizeId, params.prizeId))
		.orderBy(departments.name);

	const majorPrize = await db.select().from(majorPrizes).where(eq(majorPrizes.id, params.prizeId));
	const minorPrize = await db.select().from(minorPrizes).where(eq(minorPrizes.id, params.prizeId));

	return {
		winners: [...majorWinners, ...minorWinners],
		prize: majorPrize[0] || minorPrize[0]
	};
};
