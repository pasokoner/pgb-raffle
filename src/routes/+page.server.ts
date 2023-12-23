import { error } from '@sveltejs/kit';

import type { Actions } from './$types';
import { zfd } from 'zod-form-data';
import { db } from '$lib/server/db';
import { employees } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const toggleDutySchema = zfd.formData({
	id: zfd.text()
});

export const actions: Actions = {
	toggleDuty: async ({ request }) => {
		const data = await request.formData();

		const res = await toggleDutySchema.safeParseAsync(data);

		if (!res.success) {
			error(400, 'Invalid input');
		}

		const { id } = res.data;

		console.log(id);

		const employee = await db.select().from(employees).where(eq(employees.id, id));

		await db
			.update(employees)
			.set({
				onDuty: !employee[0].onDuty
			})
			.where(eq(employees.id, id));

		return { success: true };
	}
};
