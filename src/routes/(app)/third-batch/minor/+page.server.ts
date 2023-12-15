import { db } from "$lib/server/db";
import { employees, minorPrizes } from "$lib/server/db/schema";
import { shuffleArray } from "$lib/utils.js";
import { error, redirect } from "@sveltejs/kit";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { zfd } from "zod-form-data";

const drawSchema = zfd.formData({
	prize: zfd.text(),
	winnerCount: zfd.numeric(z.number().min(0))
});

export const actions = {
	minorDraw: async ({ request }) => {
		const data = await request.formData();

		const res = await drawSchema.safeParseAsync(data);

		if (!res.success) {
			throw error(400, "Invalid input");
		}

		const { prize, winnerCount } = res.data;

		const participants = await db.query.employees.findMany({
			where: ({ minorPrizeId }, { isNull }) => isNull(minorPrizeId)
		});

		const prizeData = await db
			.insert(minorPrizes)
			.values({
				name: prize
			})
			.returning({
				prizeId: minorPrizes.id
			});

		const winnerIds: string[] = [];
		const winners = shuffleArray(participants);

		for (let i = 0; i < winnerCount; i++) {
			winnerIds.push(winners[i].id);
		}

		await db
			.update(employees)
			.set({
				majorPrizeId: prizeData[0].prizeId
			})
			.where(inArray(employees.id, winnerIds));

		throw redirect(300, `/winners/${prizeData[0].prizeId}`);
	}
};
