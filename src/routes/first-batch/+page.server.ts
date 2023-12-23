import { db } from "$lib/server/db";
import { departments } from "$lib/server/db/schema";
import { eq, isNotNull, isNull, and, not } from "drizzle-orm";

export const load = async () => {
	const departmentsData = await db
		.select()
		.from(departments)
		.where(and(isNull(departments.purgeDate), not(eq(departments.name, "PGO-OTHERS"))));

	return {
		departments: departmentsData
	};
};

export const actions = {
	purge: async ({ request }) => {
		const data = await request.formData();

		const toPurge = data.getAll("toPurge[]");

		// await db.transaction(async (tx) => {
		for (const p of toPurge) {
			await db
				.update(departments)
				.set({ purgeDate: new Date() })
				.where(eq(departments.id, p as string));
		}
		// });

		return {
			success: true
		};
	},
	reset: async () => {
		await db.update(departments).set({ purgeDate: null }).where(isNotNull(departments.purgeDate));

		return {
			success: true
		};
	}
};
