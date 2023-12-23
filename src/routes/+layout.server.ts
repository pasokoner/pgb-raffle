import { db } from "$lib/server/db";

export const load = async () => {
	async function getEmployees() {
		return await db.query.employees.findMany({
			with: {
				department: true
			},
			orderBy: ({ name }, { asc }) => asc(name)
		});
	}

	async function getMinor() {
		return await db.query.minorPrizes.findMany({
			orderBy: ({ createdAt }, { asc }) => asc(createdAt)
		});
	}

	async function getMajor() {
		return await db.query.majorPrizes.findMany({
			orderBy: ({ createdAt }, { asc }) => asc(createdAt)
		});
	}

	return {
		employees: await getEmployees(),
		minorPrize: await getMinor(),
		majorPrize: await getMajor()
	};
};
