import { db } from "$lib/server/db";
import { departments, employees, majorPrizes } from "$lib/server/db/schema";
import { shuffleArray } from "$lib/utils.js";
import { error, redirect } from "@sveltejs/kit";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { zfd } from "zod-form-data";

const thresholdSchema = zfd.formData({
	id: zfd.text(),
	threshold: zfd.numeric(z.number().min(0))
});

const drawSchema = zfd.formData({
	prize: zfd.text()
});

export const load = async () => {
	const data = await db.query.departments.findMany({
		with: {
			employees: {
				where(employee, { isNull }) {
					return isNull(employee.majorPrizeId);
				}
			}
		},
		orderBy: (departments, { asc }) => asc(departments.name)
	});

	return {
		departments: data
	};
};

export const actions = {
	threshold: async ({ request }) => {
		const data = await request.formData();

		const res = await thresholdSchema.safeParseAsync(data);

		if (!res.success) {
			throw error(400, "Invalid input");
		}

		const { id, threshold } = res.data;

		await db
			.update(departments)
			.set({
				threshold: threshold
			})
			.where(eq(departments.id, id));

		return { success: true };
	},
	draw: async ({ request }) => {
		const data = await request.formData();

		const res = await drawSchema.safeParseAsync(data);

		if (!res.success) {
			throw error(400, "Invalid input");
		}

		const { prize } = res.data;

		const departmentWithEmployees = await db.query.departments.findMany({
			with: {
				employees: {
					where: ({ majorPrizeId }, { isNull }) => isNull(majorPrizeId)
				}
			}
		});

		const majorPrize = await db
			.insert(majorPrizes)
			.values({
				name: prize
			})
			.returning({
				prizeId: majorPrizes.id
			});

		const winnerIds: string[] = [];

		for (const e of departmentWithEmployees) {
			const winner = shuffleArray(e.employees);

			for (let i = 0; i < e.threshold; i++) {
				winnerIds.push(winner[i].id);
			}
		}

		await db
			.update(employees)
			.set({
				majorPrizeId: majorPrize[0].prizeId
			})
			.where(inArray(employees.id, winnerIds));

		throw redirect(300, `/winners/${majorPrize[0].prizeId}`);
	}
};
