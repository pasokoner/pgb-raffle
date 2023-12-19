import { auth } from "$lib/server/lucia";
import { error, fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { zfd } from "zod-form-data";
import { db } from "$lib/server/db";
import { employees } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const toggleDutySchema = zfd.formData({
	id: zfd.text(),
});

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, "/login"); // redirect to login page
	},
	toggleDuty: async ({request}) => {
		const data = await request.formData();

		const res = await toggleDutySchema.safeParseAsync(data);

		if (!res.success) {
			throw error(400, "Invalid input");
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
	},
};
