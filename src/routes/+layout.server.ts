import { db } from "$lib/server/db";

export const load = async () => {

	const employees = await db.query.employees.findMany({
		with: {
			department: true
		},
		orderBy: ({name}, {asc}) => asc(name)
	}) 

	return {
		employees
	};
};
